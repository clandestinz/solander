import React from 'react'
import styles from '../style.module.css'
import Button from './Button'
import AuthIcon from '../icons/AuthIcon'
import firebase from 'firebase/app'
import 'firebase/auth'

export default class LoginPrompt extends React.Component {
    componentDidMount() {
        setInterval(() => {
            if (this.props.show === true) {
                document.body.classList.add('promptOpen')
                document.body.style.top = `-${window.scrollY}px`
                document.body.style.top = ''
                document.getElementById('loginOverlay').classList.add('show')
            } else {
                document.body.classList.remove('promptOpen')
                document.getElementById('loginOverlay').classList.remove('show')
            }
        }, 100)
    }
    render() {
        return(
            <>
                <div onClick={(event) => {
                    if (event.target === event.currentTarget) {
                        this.props.setShow(false)
                    }
                }} className={styles.overlay} id='loginOverlay'>
                    <div className={[styles.loginPrompt, 'e-section round-up center invert'].join(' ')} style={{maxWidth: '512px'}}>
                        <div className='e-card invert' style={{maxWidth: '300px', zIndex: '15'}}>
                            {this.props.auth &&
                            (
                                <div className={styles.profile}>
                                    <p>Current user:</p>
                                    <img src={`${this.props.auth.photoURL}?height=500`} referrerPolicy='no-referrer' alt=''></img>
                                    <h4>{this.props.auth.displayName}</h4>
                                    <Button classes='red'  clickEvent={()=>firebase.auth().signOut()}>Sign Out</Button>
                                </div>
                            )
                            }
                            {!this.props.auth &&
                            (
                                <>
                                    <Button clickEvent={()=>{
                                    var googleAuthProvider = new firebase.auth.GoogleAuthProvider();

                                    firebase.auth().signInWithPopup(googleAuthProvider)
                                        .catch(err => {
                                            console.log(err)
                                        })
                                    }} classes='wide'><AuthIcon icon='google'></AuthIcon>Sign in with Google</Button>
                                    <br/>
                                    <Button clickEvent={()=>{
                                    var facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

                                    firebase.auth().signInWithPopup(facebookAuthProvider)
                                        .catch(err => {
                                            console.log(err)
                                        })
                                    }}classes='wide'><AuthIcon icon='facebook'></AuthIcon>Sign in with Facebook</Button>
                                </>
                            )
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
