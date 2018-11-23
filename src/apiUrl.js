let url = '1234'

console.log(process.env);

if(Object.keys(process.env).findIndex(key=>key=="REACT_APP_MY_DEPLOYED_APP") == -1) {
  url = "https://stormy-citadel-17314.herokuapp.com"
  // using deployed backend
  console.log("using deployed API");
}
else {
  url = "http://localhost:9292"
  console.log("using local API");
}
export default url;