import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'isomorphic-unfetch'
import firebaseConfig from '../firebaseConfig'

// export async function getServerSideProps({ req, query }) {
//   const user = req && req.session ? req.cookie.session : null
//   // don't fetch anything from firebase if the user is not found
//   return {
//     props: {
//       user
//     },
//   }
// }

function withAuthentication (WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        user: this.props.user,
      }
    }

    componentDidMount() {
      if(!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
      }
      // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
      
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({ user: user })
          return user
            // .getIdToken()
            // .then(token => {
            //   // eslint-disable-next-line no-undef
            //   return fetch('/api/login', {
            //     method: 'POST',
            //     // eslint-disable-next-line no-undef
            //     headers: new Headers({ 'Content-Type': 'application/json' }),
            //     credentials: 'same-origin',
            //     body: JSON.stringify({ token }),
            //   })
            // })
          //   .then(res => this.addDbListener())
        } else {
          this.setState({ user: null })
          // eslint-disable-next-line no-undef
          // fetch('/api/logout', {
          //   method: 'POST',
          //   credentials: 'same-origin',
          // })
        }
      })
    }

    render() {
      const { user } = this.state
      return <WrappedComponent user={user} {...this.props} />
    }
  }
}

export default withAuthentication;