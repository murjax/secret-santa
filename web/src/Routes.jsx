// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private } from '@redwoodjs/router'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/invite/{id:Int}" page={InvitePage} name="invite" />
      <Private unauthenticated="login">
        <Route path="/event/new" page={NewEventPage} name="newEvent" />
        <Route path="/event/{id:Int}" page={EventPage} name="event" />
        <Route path="/user/{id:Int}/wish-list" page={UserWishListPage} name="userWishList" />
        <Route path="/wish-list/new" page={NewWishListPage} name="newWishList" />
        <Route path="/wish-list/edit" page={EditWishListPage} name="editWishList" />
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
