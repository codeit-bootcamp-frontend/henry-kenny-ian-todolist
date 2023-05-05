const AuthRouter = ({ condition, destinationPage, redirectPage }) => {
  if (condition) return destinationPage;
  return redirectPage;
};

export default AuthRouter;
