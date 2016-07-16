$(function() {
	$(".delete").click(function(e) {
        var id = this.name;
        var item = this.parentNode.parentNode;
        console.log(item);
        $.ajax({
            type: 'DELETE',
            url: '/delete?id=' + id
        }).done(function(results){
        	if(results.success === 1) {
        		item.remove();
        	}
        });
    });
    //删除功能完成
});
