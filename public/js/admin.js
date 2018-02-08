$(function() {
  $('.del').click(function(e) {
    var id = $(this).data('id')
    $.ajax({
      type:'post',
      url: '/admin/list?id=' + id
    })
    .done((res) => {
      if (res.success === 1) {
        if ($('.item-id-'+id)) {
          $('.item-id-'+id).remove()
        }        
      }else{
        console.log(res)
      } 
    })
  })
})