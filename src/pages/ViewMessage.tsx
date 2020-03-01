import React, { Component } from 'react';
import { Message, getMessage } from '../data/messages';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  withIonLifeCycle,
  IonInput
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';
import './ViewMessage.css';

type PublicViewMessageProps = {}

type ViewMessageProps = PublicViewMessageProps & RouteComponentProps;

type ViewMessageState = {
  message? : Message;
  value : string;
};

class ViewMessage extends Component<ViewMessageProps, ViewMessageState> {

  constructor(props : ViewMessageProps){
    super(props);

    this.state = {
      value : ''
    };
  }

  ionViewWillEnter(){
    const {id} : any = this.props.match.params;
    const message : Message = getMessage(parseInt(id, 10))!;
    this.setState({message});
  }

  private onChangeValue(e : any){
    let value = e.detail.value;
    this.setState({value});
  }

  render(){
    return(
      <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="Inbox" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {this.state.message ? (
          <>
            <IonItem>
              <IonIcon icon={personCircle} color="primary"></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>
                  {this.state.message.fromName}
                  <span className="date">
                    <IonNote>{this.state.message.date}</IonNote>
                  </span>
                </h2>
                <h3>To: <IonNote>Me</IonNote></h3>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <h1>{this.state.message.subject}</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className="ion-padding">
              <IonInput value={this.state.value} placeholder={'Say hello'} onIonChange={(e) => this.onChangeValue(e)}></IonInput>
              Message:
              <div>{this.state.value}</div>
            </div>
          </>
        ) : <div>Message not found</div>}
      </IonContent>
    </IonPage>
    );
  }

}

export default withIonLifeCycle(ViewMessage);
