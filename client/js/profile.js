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
