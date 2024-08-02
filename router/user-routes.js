const router = require("express").Router();
const UserController = require("../controller/user-controller");
const auth = require("../middleware/auth");
// const AccountController = require('../controller/account_controller');
// const TransactionController = require('../controller/transaction-controller');
// const BlocController = require('../controller/bloc-controller');

router.post("/register", auth, UserController.register);
router.post("/login", UserController.login);
router.patch("/updateProfile", auth, UserController.updateProfile);
router.get("/", auth, UserController.getAllUsers);
// router.put('/update', UserController.update);
// router.get('/logout', UserController.logout);
// // router.get('/demousers', UserController.demousers);

// // CRUD WITH Account
// router.post('/createaccount', AccountController.createAccount);
// router.get('/useraccount', AccountController.getUserAccount);
// router.put('/updateaccount', AccountController.updateAccount);
// router.post('/deleteaccount', AccountController.deleteAccount);

// // CRUD WITH TRANSACTION
// router.post('/transferfund', TransactionController.transfer); // Also Creates a BLOC
// router.post('/withdraw', TransactionController.withdraw);
// router.put('/confirmwithdrawal', TransactionController.confirmWithdrawal);
// router.post('/updateamount', TransactionController.updateTransaction);
// router.get('/viewtransactions', TransactionController.allTransactions);
// router.get('/mytransactions', TransactionController.myTransactions);
// // router.post('/send_t', TransactionController.sendTransactions);
// // router.post('/receive_t', TransactionController.receiveTransactions);
// router.post('/deletetransaction', TransactionController.deleteTransaction);

// // CRUD WITH BLOC
// // router.post('/deletetransaction', BlocController.addTransaction);
// router.get('/viewblocs', BlocController.viewAllBlocs);
// router.post('/updatebloc', BlocController.updateBloc);
// router.post('/deletebloc', BlocController.deleteBloc);

module.exports = router;
