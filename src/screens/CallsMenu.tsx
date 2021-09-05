import React, { FC, useState, useEffect, useRef } from 'react';
import EmployeeVideoChat from '../components/CallsMenuComponents/EmployeeVideoChat';
import { VideoCall, Assistant } from '@material-ui/icons';
import { RootState } from '../redux/store';
import { connect } from 'react-redux';
import { ConnectionState } from '../redux/types/ConnectionTypes';
import '../styles/css/calls.scss';
import { Button } from '@material-ui/core';
import '../styles/css/catalogueMenu.scss';
import { Typography, List, ListItem, ListItemText, ListItemIcon, LinearProgress } from '@material-ui/core';

interface StateProps {
  connection: ConnectionState;
  shopId: string;
  userId: string;
}

interface Props extends StateProps {
  // extra props you want to add
}

const CallsMenu: FC<Props> = (props: Props) => {
  const { firestore } = props.connection;
  const [requests, setRequests] = useState<string[]>([]);
  const [onCall, setOnCall] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const refRequests = useRef<string[]>([]);

  useEffect(() => {
    console.log('This it a test console log to prevent firestore excessive requests...');
    const unsubscribe = firestore
      .collection('shopCalls')
      .doc(props.shopId)
      .collection('calls')
      .onSnapshot((snapshot) => {
        // If there are changes in the current waiting calls
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'modified') {
            if (!change.doc.data().status?.answered && change.doc.data().status?.inProgress) {
              refRequests.current.push(change.doc.id);
              setRequests((oldArray) => {
                if (!oldArray.includes(change.doc.id)) {
                  return [...oldArray, change.doc.id];
                }
                return oldArray;
              });
            }
          }
          if (change.type === 'removed') {
            refRequests.current = refRequests.current.filter((item) => item !== change.doc.id);
            setRequests(refRequests.current.filter((item) => item !== change.doc.id));
          }
        });
        setLoading(false);
      });
    return () => {
      unsubscribe();
    };
  }, [firestore]);

  const answerCall = async (requestId: string): Promise<void> => {
    // If there's not a call, set it as current call
    refRequests.current = requests;
    !onCall && setOnCall(requestId);
  };

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Call Requests
      </Typography>
      <div className="requests-container">
        <List className="list">
          {requests.length === 0 && (
            <ListItem className="item" button disabled={true}>
              <ListItemIcon>
                <Assistant />
              </ListItemIcon>
              <ListItemText primary={'No calls yet...'} />
            </ListItem>
          )}
          {requests.map((request, index) => (
            <ListItem className="item" button disabled={!!onCall} key={request} onClick={() => answerCall(request)}>
              <ListItemIcon>
                <VideoCall />
              </ListItemIcon>
              <ListItemText primary={`Answer client ${index + 1} call`} />
            </ListItem>
          ))}
        </List>
        {loading && <LinearProgress />}
      </div>
      {onCall && <EmployeeVideoChat callId={onCall} setOnCall={setOnCall} shopId={props.shopId} />}
      <div className="btn-bottom-left">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.go(-1);
          }}>
          Back
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    connection: state.connection,
    shopId: state.shop.id,
    userId: state.user.id,
  };
};

export default connect(mapStateToProps)(CallsMenu);
