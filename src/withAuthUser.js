import React, { useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { AuthUserContext } from 'src/useAuthUser'
import createAuthUser from 'src/createAuthUser'
import useFirebaseUser from 'src/useFirebaseUser'
import { getConfig } from 'src/config'
import AuthAction from 'src/AuthAction'
import isClientSide from 'src/isClientSide'
import logDebug from 'src/logDebug'

/**
 * A higher-order component that provides pages with the
 * AuthUser and, optionally, redirects or renders different
 * children based on the user's current auth state.
 * To access the user from SSR, this should be paired with
 * `withAuthUserSSR` or `withAuthUserTokenSSR`.
 * @param {String} whenAuthed - The behavior to take if the user
 *   *is* authenticated. One of AuthAction.RENDER or
 *   AuthAction.REDIRECT_TO_APP. Defaults to AuthAction.RENDER.
 * @param {String} whenUnauthedBeforeInit - The behavior to take
 *   if the user is not authenticated but the Firebase client JS
 *   SDK has not initialized. One of: AuthAction.RENDER,
 *   AuthAction.REDIRECT_TO_LOGIN, AuthAction.SHOW_LOADER,
 *   AuthAction.RETURN_NULL. Defaults to AuthAction.RENDER.
 * @param {String} whenUnauthedAfterInit - The behavior to take
 *   if the user is not authenticated and the Firebase client JS
 *   SDK has already initialized. One of: AuthAction.RENDER,
 *   AuthAction.REDIRECT_TO_LOGIN. Defaults to AuthAction.RENDER.
 * @param {String|Function} appPageURL - The redirect destination URL when
 *   we redirect to the app. Can either be a string or a function
 *   that accepts ({ctx, AuthUser}) as args and returns a string.
 * @param {String|Function} authPageURL - The redirect destination URL when
 *   we redirect to the login page. Can either be a string or a function
 *   that accepts ({ctx, AuthUser}) as args and returns a string.
 * @param {Function} Loader - The React component to show when the
 *   user is unauthed and `whenUnauthedBeforeInit` is set to
 *   `AuthAction.SHOW_LOADER`.
 * @return {Function} A function that takes a child component
 */
const withAuthUser =
  ({
    whenAuthed = AuthAction.RENDER,
    whenUnauthedBeforeInit = AuthAction.RENDER,
    whenUnauthedAfterInit = AuthAction.RENDER,
    appPageURL = null,
    authPageURL = null,
    LoaderComponent = null,
  } = {}) =>
  (ChildComponent) => {
    const WithAuthUserHOC = (props) => {
      const { AuthUserSerialized, ...otherProps } = props
// <<<<<<< HEAD
      const AuthUserFromServer = createAuthUser({
        serializedAuthUser: AuthUserSerialized,
      })

      const {
        user: firebaseUser,
        initialized: firebaseInitialized,
        claims,
      } = useFirebaseUser()
      // const AuthUserFromClient = createAuthUser({
      //   firebaseUserClientSDK: firebaseUser,
      //   clientInitialized: firebaseInitialized,
      //   claims,
      // })
// =======
      const AuthUserFromServer = useMemo(
        () =>
          createAuthUser({
            serializedAuthUser: AuthUserSerialized,
          }),
        [AuthUserSerialized]
      )

      const {
        user: firebaseUser,
        claims,
        initialized: firebaseInitialized,
        authRequestCompleted,
      } = useFirebaseUser()
      const AuthUserFromClient = useMemo(
        () =>
          createAuthUser({
            firebaseUserClientSDK: firebaseUser,
            clientInitialized: firebaseInitialized,
            claims,
          }),
        [firebaseUser, firebaseInitialized, claims]
      )
// >>>>>>> 887eb7633fe7fc8eb1db3b703e1814cc3f7b44c7

      // Set the AuthUser to values from the Firebase JS SDK user
      // once it has initialized. On the server side and before the
      // client-side SDK has initialized, use the AuthUser from the
      // session.
// <<<<<<< HEAD
      // const AuthUser =
        // AuthUserFromServer.id === null
          // ? createAuthUser({
              // firebaseUserClientSDK: firebaseUser,
              // clientInitialized: firebaseInitialized,
              // claims,
            // })
          // : AuthUserFromServer
      // if (firebaseInitialized && AuthUser.firebaseUser === null) {
        // AuthUser.firebaseUser = firebaseUser
        // AuthUser.clientInitialized = true
      // }
      // const isAuthed =
        // firebaseInitialized === true ? !!AuthUser.firebaseUser : !!AuthUser.id
//
      // const isInitialized = AuthUser.clientInitialized
//
      // // Redirect to the app if the user is authed and the "whenAuthed"
      // // argument is set to redirect to the app.
      // const shouldRedirectToApp =
        // isAuthed && whenAuthed === AuthAction.REDIRECT_TO_APP
//
      // // Redirect to the login page if the user is not authed and,
      // // considering whether the Firebase JS SDK is initialized, the
      // // "when unauthed" settings inform us to redirect.
      // const shouldRedirectToLogin =
        // !isAuthed &&
        // ((!isInitialized &&
          // whenUnauthedBeforeInit === AuthAction.REDIRECT_TO_LOGIN) ||
          // (isInitialized &&
            // whenUnauthedAfterInit === AuthAction.REDIRECT_TO_LOGIN))
//
      // const router = useRouter()
      // const redirectToApp = useCallback(() => {
        // const appRedirectDestination = appPageURL || getConfig().appPageURL
        // if (!appRedirectDestination) {
          // throw new Error(
            // 'The "appPageURL" config setting must be set when using `REDIRECT_TO_APP`.'
          // )
        // }
//
        // const destination =
          // typeof appRedirectDestination === 'string'
            // ? appRedirectDestination
            // : appRedirectDestination({ ctx: undefined, AuthUser })
//
        // if (!destination || typeof destination !== 'string') {
          // throw new Error(
            // 'The "appPageURL" must be set to a non-empty string or resolve to a non-empty string'
          // )
        // }
        // router.replace(destination)
      // }, [router, AuthUser])
      // const redirectToLogin = useCallback(() => {
        // const authRedirectDestination = authPageURL || getConfig().authPageURL
        // if (!authRedirectDestination) {
          // throw new Error(
            // 'The "authPageURL" config setting must be set when using `REDIRECT_TO_LOGIN`.'
          // )
        // }
//
        // const destination =
          // typeof authRedirectDestination === 'string'
            // ? authRedirectDestination
            // : authRedirectDestination({ ctx: undefined, AuthUser })
//
        // if (!destination || typeof destination !== 'string') {
          // throw new Error(
            // 'The "authPageURL" must be set to a non-empty string or resolve to a non-empty string'
          // )
        // }
        // router.replace(destination)
      // }, [router, AuthUser])
//
      // useEffect(() => {
        // // Only redirect on the client side. To redirect server-side,
        // // use `withAuthUserSSR` or `withAuthUserTokenSSR`.
        // if (!isClientSide()) {
          // return
        // }
        // if (shouldRedirectToApp) {
          // redirectToApp()
        // } else if (shouldRedirectToLogin) {
          // redirectToLogin()
        // }
      // }, [
        // shouldRedirectToApp,
        // shouldRedirectToLogin,
        // redirectToApp,
        // redirectToLogin,
      // ])
//
      // // If we are in the process of redirecting, don't render
      // // anything.
      // const isRedirecting = shouldRedirectToApp || shouldRedirectToLogin
      // if (isRedirecting) {
        // return null
      // }
//
      // // If the user is not authed and the Firebase JS SDK has
      // // not yet initialized, optionally show a "loading" component
      // // or return null rather than rendering.
      // if (!isInitialized && !isAuthed) {
        // if (whenUnauthedBeforeInit === AuthAction.SHOW_LOADER) {
          // return LoaderComponent ? <LoaderComponent /> : null
        // }
        // if (whenUnauthedBeforeInit === AuthAction.RETURN_NULL) {
          // return null
        // }
      // }
//
      // return (
        // <AuthUserContext.Provider value={AuthUser}>
          // {[> eslint-disable-next-line react/jsx-props-no-spreading <]}
          // <ChildComponent {...otherProps} />
        // </AuthUserContext.Provider>
      // )
    // }
//
    // WithAuthUserHOC.displayName = 'WithAuthUserHOC'
//
// =======
      const AuthUser = firebaseInitialized
        ? AuthUserFromClient
        : AuthUserFromServer

      const isAuthed = !!AuthUser.id
      const isInitialized = AuthUser.clientInitialized

      // Redirect to the app if all are true:
      // * the user is authed
      // * the "whenAuthed" argument is set to redirect to the app
      // * if on the client side, the call to set cookies has completed
      //   (see: https://github.com/gladly-team/next-firebase-auth/issues/189)
      const willRedirectToApp =
        isAuthed && whenAuthed === AuthAction.REDIRECT_TO_APP
      const shouldRedirectToApp =
        willRedirectToApp && isClientSide && authRequestCompleted

      // Redirect to the login page if the user is not authed and one of these
      // is true:
      // * the "when unauthed" settings tell us to redirect to login BEFORE
      //   Firebase has initialized
      // * the "when unauthed" settings tell us to redirect to login AFTER
      //   Firebase has initialized, and the call to set cookies has completed
      //   (see: https://github.com/gladly-team/next-firebase-auth/issues/189)
      const willRedirectToLogin =
        !isAuthed &&
        ((!isInitialized &&
          whenUnauthedBeforeInit === AuthAction.REDIRECT_TO_LOGIN) ||
          (isInitialized &&
            whenUnauthedAfterInit === AuthAction.REDIRECT_TO_LOGIN))
      const shouldRedirectToLogin =
        willRedirectToLogin &&
        isClientSide &&
        // We don't have to wait for an auth request if we should redirect
        // before Firebase initializes.
        (whenUnauthedBeforeInit !== AuthAction.REDIRECT_TO_LOGIN
          ? authRequestCompleted
          : true)

      const router = useRouter()
      const redirectToApp = useCallback(() => {
        logDebug('Redirecting to app.')
        const appRedirectDestination = appPageURL || getConfig().appPageURL
        if (!appRedirectDestination) {
          throw new Error(
            'The "appPageURL" config setting must be set when using `REDIRECT_TO_APP`.'
          )
        }

        const destination =
          typeof appRedirectDestination === 'string'
            ? appRedirectDestination
            : appRedirectDestination({ ctx: undefined, AuthUser })

        if (!destination || typeof destination !== 'string') {
          throw new Error(
            'The "appPageURL" must be set to a non-empty string or resolve to a non-empty string'
          )
        }
        router.replace(destination)
      }, [router, AuthUser])
      const redirectToLogin = useCallback(() => {
        logDebug('Redirecting to login.')
        const authRedirectDestination = authPageURL || getConfig().authPageURL
        if (!authRedirectDestination) {
          throw new Error(
            'The "authPageURL" config setting must be set when using `REDIRECT_TO_LOGIN`.'
          )
        }

        const destination =
          typeof authRedirectDestination === 'string'
            ? authRedirectDestination
            : authRedirectDestination({ ctx: undefined, AuthUser })

        if (!destination || typeof destination !== 'string') {
          throw new Error(
            'The "authPageURL" must be set to a non-empty string or resolve to a non-empty string'
          )
        }
        router.replace(destination)
      }, [router, AuthUser])

      useEffect(() => {
        // Only redirect on the client side. To redirect server-side,
        // use `withAuthUserSSR` or `withAuthUserTokenSSR`.
        if (!isClientSide()) {
          return
        }
        if (shouldRedirectToApp) {
          redirectToApp()
        } else if (shouldRedirectToLogin) {
          redirectToLogin()
        }
      }, [
        shouldRedirectToApp,
        shouldRedirectToLogin,
        redirectToApp,
        redirectToLogin,
      ])

      // Decide what to render.
      let returnVal = null
      const loaderComp = LoaderComponent ? <LoaderComponent /> : null
      const comps = (
        <AuthUserContext.Provider value={AuthUser}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <ChildComponent {...otherProps} />
        </AuthUserContext.Provider>
      )
      if (willRedirectToApp) {
        returnVal = null
      } else if (willRedirectToLogin) {
        if (whenUnauthedBeforeInit === AuthAction.RETURN_NULL) {
          returnVal = null
        } else if (whenUnauthedBeforeInit === AuthAction.SHOW_LOADER) {
          returnVal = loaderComp
        } else {
          returnVal = comps
        }
      } else if (!isAuthed && !authRequestCompleted) {
        if (whenUnauthedBeforeInit === AuthAction.SHOW_LOADER) {
          returnVal = loaderComp
        } else if (whenUnauthedBeforeInit === AuthAction.RETURN_NULL) {
          returnVal = null
        } else {
          returnVal = comps
        }
      } else {
        returnVal = comps
      }

      logDebug('AuthUser set to:', AuthUser)

      return returnVal
    }

    WithAuthUserHOC.displayName = 'WithAuthUserHOC'
    hoistNonReactStatics(WithAuthUserHOC, ChildComponent)
    return WithAuthUserHOC
  }

export default withAuthUser
