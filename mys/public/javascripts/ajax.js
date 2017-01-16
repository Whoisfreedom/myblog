
$("#login").submit(function(event) {
  console.log($(this).serialize());
  $.ajax({
    url: '/users/login',
    type: 'POST',
    dataType: 'json',
    data:$(this).serialize()
  })
  .done(function(data) {
    console.log(data);
    if(data.result){
      location.href = '/inLogin';
    }else{
      alert("账号密码错误")
    }
  })
  .fail(function() {
    console.log(arguments);
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
  return false;
});
$("#registered").submit(function(event) {
  var resultArr = $(this).serialize().split('&');
  var information = [];
  for(var i = 0;i<resultArr.length;i++){
    information.push(resultArr[i].substring(resultArr[i].indexOf('=')+1)); 
  }
  if(information[1]!=information[2]){
    event.preventDefault(); 
    alert('请输入相同的密码');
  }else{
    event.preventDefault();
    $.ajax({
    url: '/users/newLogin',
    type: 'POST',
    dataType: 'json',
    data: $(this).serialize(),
    })
    .done(function(data) {
      console.log(data);
      if(data.result){
       location.href = '/inLogin'; 
      }else{
        alert("账号已经被别人使用");
      }
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  }
});
$(#artUp).submit(function(event){
    console.log(this.serialize());
    $.ajax({
      url: '/path/to/file',
      type: 'default GET (Other values: POST)',
      dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
      data: {param1: 'value1'},
    })
    .done(function() {
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
    
})