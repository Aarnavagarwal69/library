
import React from 'react';
import { Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput, Image, StyleSheet, Alert, ToastAndroid} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as firebase from "firebase";
import db from '../config.js';

export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      hasCameraPermissions : null,
      scanned : false,
      scannedBookId : '',
      scannedStudentId : '',
      buttonState : 'normal',
      transactionMessage : ''
    }
  }

  getCameraPermissions = async (id) =>{
    const {status}  = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" is true when user has granted permission
        status === "granted" is false when user has not granted the permission
      */
      hasCameraPermissions : status === "granted",
      buttonState : id,
      scanned : false
    })
  }

  handleBarCodeScanned  = async ({type, data})=>{
    const { buttonState} = this.state

    if(buttonState === "BookId"){
      this.setState({
        scanned : true,
        scannedBookId : data,
        buttonState : 'normal'
      });
    }
    else if(buttonState === "StudentId"){
      this.setState({
        scanned : true,
        scannedStudentId : data,
        buttonState : 'normal'
      })
    }
  }

  initiateBookIssue = async ()=>{
    //add a transaction
    db.collection("transactions").add({
      'studentId' : this.state.scannedStudentId,
      'bookId' : this.state.scannedBookId,
      'date' : firebase.firestore.Timestamp.now().toDate(),
      'transactionType' : "Issue"
    })

    //change book status
    db.collection("books").doc(this.state.scannedBookId).update({
      'availability' : false
    })
    //change number of issued books for student
    db.collection("students").doc(this.state.scannedStudentId).update({
      'no._of_books_issued' : firebase.firestore.FieldValue.increment(1)
    })
Alert.alert("book issued")
    this.setState({
      scannedStudentId : '',
      scannedBookId: ''
    })
  }

  initiateBookReturn = async ()=>{
    //add a transaction
    db.collection("transactions").add({
      'studentId' : this.state.scannedStudentId,
      'bookId' : this.state.scannedBookId,
      'date'   : firebase.firestore.Timestamp.now().toDate(),
      'transactionType' : "Return"
    })

    //change book status
    db.collection("books").doc(this.state.scannedBookId).update({
      'availability' : true
    })

    //change book status
    db.collection("students").doc(this.state.scannedStudentId).update({
      'no._of_books_issued' : firebase.firestore.FieldValue.increment(-1)
    })

    this.setState({
      scannedStudentId : '',
      scannedBookId : ''
    })
  }
  checkbookaligibility = async()=>{
    const bookref = await db.collection("books").where("bookID","==",this.state.scannedBookId).get()
    var transactionType = " "
    if (bookref.docs.length===0){
      transactionType=false;
    }
    else{
      bookref.docs.map((doc)=>{
        var book = doc.data()
      if(book.availability){
         transactionType="issued"
      }
      else{
        transactionType="returned"
      }
    })
    
  }
  return transactionType
  }


  checkstudentaligibility01 = async()=>{
    const studentref = await db.collection("students").where("studentId","==",this.state.scannedStudentId).get()
    var studenteligible=" "
    if (studentref.docs.length===0){
      this.setState({
        scannedStudentId:'',
        scannedBookId:''
      })
      studenteligible=false;
      Alert.alert("student doesn't exist in database")
    }
    else{
studentref.docs.map((doc)=>{
  var student = doc.data();
  if (student.no._of_books_issued<2){
    studenteligible=true;
  }
  else{
    studenteligible=false
    Alert.alert("student has already issued two books")
    this.setState({
      scannedStudentId:'',
      scannedBookId:''
    })
  }
})
    }
return studenteligible;
  }
  checkstudenteligibility02 = async () => {
    const transactionRef = await db
      .collection("transactions")
      .where("bookId", "==", this.state.scannedBookId)
      .limit(1)
      .get();
    var isStudentEligible = "";
    transactionRef.docs.map((doc) => {
      var lastBookTransaction = doc.data();
      if (lastBookTransaction.studentId === this.state.scannedStudentId) {
        isStudentEligible = true;
      } else {
        isStudentEligible = false;
        Alert.alert("The book wasn't issued by this student!");
        this.setState({
          scannedStudentId: "",
          scannedBookId: ""
        });
      }
    });
    return isStudentEligible;
  };



  handleTransaction = async()=>{
    var transactionType = await this.checkbookaligibility();
    if (!transactionType){
      Alert.alert("this book doesn't exist in the library")
      this.setState({scannedBookId:"",scannedStudentId:""})
    }
    else if (transactionType==="issued"){
      var studenteligible = await this.checkstudentaligibility01()
      if (studenteligible){
        this.initiateBookIssue();
        Alert.alert("book issued to student")
      }
    }
else{
  var studenteligible = await this.checkbookaligibility02()
  if (studenteligible){
    this.initiateBookReturn();
    Alert.alert("book returned")
  }
}
    // var transactionMessage = null;
    // db.collection("books").doc(this.state.scannedBookId).get()
    // .then((doc)=>{
    //   var book = doc.data()
    //   if(book.availability){
    //     this.initiateBookIssue();
    //     transactionMessage = "Book Issued"
    //     ToastAndroid.show(transactionMessage,ToastAndroid.SHORT)
    //   }
    //   else{
    //     this.initiateBookReturn();
    //     transactionMessage = "Book Returned"
    //     ToastAndroid.show(transactionMessage,ToastAndroid.SHORT)
    //   }
    // })

    // this.setState({
    //   transactionMessage : transactionMessage
    // })
  }

  render(){
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if(buttonState !== "normal" && hasCameraPermissions){
      return(
        <BarCodeScanner
          onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
          style = {StyleSheet.absoluteFillObject}
        />
      );
    }

    else if (buttonState === "normal"){
      return(
          <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
        <View>
          <Image
            source = {require("../assets/book.png")}
            style= {{width:200, height:200}}/>
          <Text style={{textAlign:'center', fontSize:30,}}>Wily</Text>
        </View>
        <View style={styles.inputView}>
        <TextInput
          style={styles.inputBox}
          placeholder="Book Id"
          onChangeText={text=>this.setState({scannedBookId:text})}
          value={this.state.scannedBookId}/>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={()=>{
            this.getCameraPermissions("BookId")
          }}>
          <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity>
        </View>

        <View style={styles.inputView}>
        <TextInput
          style={styles.inputBox}
          placeholder="Student Id"
          onChangeText={text=>this.setState({scannedStudentId:text})}
          value={this.state.scannedStudentId}/>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={()=>{
            this.getCameraPermissions("StudentId")
          }}>
          <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.transactionAlert}>{this.state.transactionMessage}</Text>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={async()=>{
            var transactionMessage = await this.handleTransaction();
            this.setState({scannedStudentId:" ", scannedBookId:" "})
          }}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
      )
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayText:{
    fontSize: 15,
    textDecorationLine: 'underline'
  },
  scanButton:{
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 10
  },
  buttonText:{
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10
  },
  inputView:{
    flexDirection: 'row',
    margin: 20
  },
  inputBox:{
    width: 200,
    height: 40,
    borderWidth: 1.5,
    borderRightWidth: 0,
    fontSize: 20
  },
  scanButton:{
    backgroundColor: '#66BB6A',
    width: 50,
    borderWidth: 1.5,
    borderLeftWidth: 0
  },
  submitButton:{
    backgroundColor: '#FBC02D',
    width: 100,
    height:50
  },
  submitButtonText:{
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight:"bold",
    color: 'white'
  }
});
