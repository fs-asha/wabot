var mobileText = "Hey, How are you? Write here your new message...";
var messageLimit = 500;
var message = $("#message-text");
var mobileView = $(".message-content");
var category = $("#selCategory");
var sendBtn = $("#sendBtn");
var saveBtn = $("#saveBtn");
var resetBtn = $("#resetBtn");
var modalPrevMsg = $('#choose-previous-message');
var counter = $("#count");
var isReached;

(function () {
  "use strict";

  message.on("change keyup", function () {
    if ($(this).val() !== "") {
      mobileView.html($(this).val());
    } else {
      mobileView.html(mobileText);
    }
    getCounter($(this).val());
    validate();
  });

  category.on("change", function () {
    validate();
  });

  saveBtn.on("click", function () {
    bootbox.confirm({
      message: "Do you really want to save this message?",
      buttons: {
          confirm: {
              label: 'Yes',
              className: 'btn-success'
          },
          cancel: {
              label: 'No',
              className: 'btn-danger'
          }
      },
      callback: function (result) {
          result ? collectPayloads('save') : callClear();
      }
    });
  });

  sendBtn.on("click", function () {
    bootbox.confirm({
      message: "Do you really want to send this message to {number} of people?",
      buttons: {
          confirm: {
              label: 'Yes',
              className: 'btn-success'
          },
          cancel: {
              label: 'No',
              className: 'btn-danger'
          }
      },
      callback: function (result) {
          result ? collectPayloads('send') : callClear();
      }
    });    
  });

  resetBtn.on("click", ()=>callClear());
  
  function collectPayloads(action){
    var formData = new FormData();
    // Main Page
    formData.append("pageTitle", message.val());
    formData.append("assistantUrl", category.val());
    saveSettings(formData, action);
  }

  function saveSettings(formData, action) {
    var url = action==='save'?'saveMessageApi':'sendMessageApi';
    $.ajax({
      url: url,
      method: "POST",
      async: false,
      data: formData,
      contentType: false,
      processData: false,
      success: function (data) {
        var response = data;
        if (response.data.length > 0) {
          var status = response.status;
          if (status == "200") {
            // Do Something
          } else {
            // Do Something
          }
        } else {
          console.log("No data available for selected values.");
        }
      },
    }).fail(function () {
      console.log(
        "Something unexpected happened. Please refresh and login again."
      );
    });
  }  

  function getMessageList(){
    // TODO: Handle special characters from message while sending to copy2MessageBox
    //  ' \r\n : and more need to check
    var tdata = messageList.messages.map((msg, id)=>{
      return tdata = '<tr>' 
                  + '<td>' + (id+1) + '</td>'
                  + '<td>' + msg.date + '</td>'
                  + '<td>' + msg.message + '</td>'
                  + '<td>'
                  + '<button type="button" class="btn btn-success btn-sm" '
                  + ' onclick="window.copy2MessageBox(\''+ String(msg.message) +'\')"><i class="fa fa-copy"></i> &nbsp;Copy</button>'
                  + '</td>'
                  + '<tr>'
    });
    setTimeout(()=>{
      $('#historyTable tbody').html(tdata);
    }, 500)
  }

  function callClear(){
    message.val("");
    mobileView.html(mobileText);
    $("#selCategory option").prop("selected", function () {
      return this.defaultSelected;
    });
    validate();
    getCounter(message.val())
  }

  function getCounter(cnt){
    isReached = cnt.length > messageLimit;
    isReached? (counter.addClass('danger'), message.addClass('is-invalid')) : (counter.removeClass('danger'), message.removeClass('is-invalid'));
    counter.text((cnt.length) + '/' + messageLimit);
  }

  function validate() {
    if (category.val() !== "-" && message.val() !== "" && !isReached) {
      sendBtn.removeAttr("disabled");
      saveBtn.removeAttr("disabled");
    } else {
      sendBtn.attr("disabled", "disabled");
      saveBtn.attr("disabled", "disabled");
    }
  }

  $(document).ready(function () {
    validate();
    getMessageList();
    getCounter($(this).val());
    $('#historyTable').DataTable();
  });

  window.copy2MessageBox= function(e){
    message.val(e);
    getCounter(e);
    validate();
    var dialog = bootbox.dialog({ 
      message: "Message copied successfully!" 
    }); 
  
    setTimeout(()=> {modalPrevMsg.modal('hide')}, 200);
    setTimeout(()=> {dialog.modal('hide')}, 1300);
  };
})();
