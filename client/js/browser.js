$(".expandRocket").click(()=> {
  console.log('button clicked');
  let rocketIDValue = event.target.firstElementChild.value;
  $.get("/rocketStatistics", { rocketID:  rocketIDValue }, (data) => {
    document.open();
    document.write(data);
    document.close();
  });
  // window.location.href = "/statistics";
});

$(".expandProfile").click(()=> {
  console.log('button clicked');
  let profileIDValue = event.target.firstElementChild.value;
  $.get("/otherProfile", { profileID:  profileIDValue }, (data) => {
    document.open();
    document.write(data);
    document.close();
  });
  // window.location.href = "/statistics";
});
