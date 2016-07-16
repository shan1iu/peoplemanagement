function add(object){
	var sex;
	var marriage;
	if(object.sex == true) {
		sex = '男';
	} else {
		sex = '女';
	}
	if(object.marriage == true) {
		marriage = '已婚';
	} else {
		marriage = '未婚';
	}
	var html = "<div class='searchResult loadEmotion'>"+
	"<span class='each big'>姓名:<span class='bold'>"+object.name+
	"</span></span><span class='each'>性别:<span class='bold'>"+sex+
	"</span></span><span class='each'>年龄:<span class='bold'>"+object.age+
	"</span></span><span class='each'>职称:<span class='bold'>"+object.pro+
	"</span></span><span class='each'>学历:<span class='bold'>"+object.edu+
	"</span></span><span class='each'>所在学院:<span class='bold'>"+object.loc+
	"</span></span><span class='each'>工作年份:<span class='bold'>"+object.year+
	"</span></span><span class='each'>婚姻情况:<span class='bold'>"+marriage+
	"</span></span><span class='each'>QQ:<span class='bold'>"+object.qq+
	"</span></span><span class='each'>手机:<span class='bold'>"+object.phone+
	"</span></span><span class='each'>邮箱:<span class='bold'>"+object.email+
	"</span></span><span class='each'>联系地址:<span class='bold'>"+object.address+
	"</span></span></div>";
	$(".result").append(html);
}
$(function(){
	$('#search').click(function(){
		$(".result").empty();
        var name;
        var sex;
        var marriage;
        var pro;
        var edu;
        var searchSex;
        var searchMarriage;

        var searchName = $("#name_search").val();
		var sex1 = $("input[name='sex']:checked").val();
		var marriage1 = $("input[name='marriage']:checked").val();
		var searchPro = $("#propro option:checked").text();
		var searchEdu = $("#eduedu option:checked").text();

        console.log(searchName);
        console.log(sex1);
        console.log(marriage1);
        console.log(searchPro);
        console.log(searchEdu);

        //性别与婚姻都有选择的时候
		if(sex1 == '男') {
            searchSex = true;
        } else if(sex1 == '女') {
            searchSex = false;
        }
        if(marriage1 == 'yes') {
            searchMarriage = true;
        } else if(marriage1 == 'no') {
            searchMarriage = false;
        }
        //传入url的参数
        if(searchName == ""){
            name = "";
        } else {
            name = "name=" + searchName;
        }
        if(sex1 == undefined){
            sex = "";
        } else if(searchName == ""){
            sex = "sex=" + searchSex;
        } else {
            sex = "&sex=" + searchSex;
        }
        if(marriage1 == undefined){
            marriage = "";
        } else if(searchName == "" && sex1 == "") {
            marriage = "marriage=" + searchMarriage;
        } else {
            marriage = "&marriage=" + searchMarriage;
        }
        if(searchPro == ""){
            pro = "";
        } else if(searchName == "" && sex1 == undefined && marriage1 == undefined) {
            pro = "pro=" + searchPro;
        } else {
            pro = "&pro=" + searchPro;
        }
        if(searchEdu == ""){
            edu = "";
        } else if(searchName == "" && sex1 == undefined && marriage1 == undefined && pro == "") {
            edu = "edu=" + searchEdu;
        } else {
            edu = "&edu=" + searchEdu;
        }

        var queryString = name + sex + marriage + pro + edu;

        $.ajax({
            type: 'GET',
            url: '/searchResult?' + queryString,
            success: function(result){
                if(result.length == 0) {
                    $(".result").append('<div class="center loadEmotion">并没有数据......</div>');
                } else {
                    for(var i = 0; i < result.length; i++) {
                        add(result[i]);
                    }
                }
            }
        });
	});
});