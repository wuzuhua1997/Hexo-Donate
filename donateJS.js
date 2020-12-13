<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sviptzk/HexoStaticFile@master/Hexo/css/custom.min.css">
<p>截至 <span class="inline-tag red">nowDate</span>，共收到来自 <span class="inline-tag red">personNum</span>位小伙伴的打赏，金额为
    <span class="inline-tag red">sumDonate</span> 元！</p>
<table>
    <thead>
    <tr>
        <th align="center">用户名</th>
        <th align="center">打赏方式</th>
        <th align="center">打赏金额</th>
        <th align="center">是否核实</th>
    </tr>
    </thead>
</table>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery@latest/dist/jquery.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/wuzuhua1997/Hexo-donate@master/donateJS.js"></script>
/**
 * Hexo-Donate v1.0.0
 * autho XJHui
 * url https://xingjiahui.top
 * Last Update: 2020/6/4
 */
//通过get请求，获取getJsonData.php文件从数据库中获取的数据
$.get("https://ds.nico.run/getJsonData.php", function getData(data) {
    //强转jsSon类型，便于操作数据
    var donationInfo = JSON.parse(data);
    //获取table标签，将获取的数据插入
    var donate_tbody = $("table")[0];
    //构造字符串
    var temp = '<tr><td align="center"><a href="{url}" target="_blank" rel="noopener">{name}</a></td><td align="center">{pay_way}</td><td align="center">{userdonate}</td><td align="center">{donate_out}</td></tr>';
    var STR = "<tbody>";
    for (var i = 0; i < donationInfo.length;
         i++) {
        var str = temp.replace("{url}", donationInfo[i].user_url).replace("{name}", donationInfo[i].user_name).replace("{pay_way}", donationInfo[i].pay_way).replace("{userdonate}", donationInfo[i].user_donate);
        if (donationInfo[i].donate_confirm == "NO") {
            str = str.replace("{donate_out}", "待核实");
        } else {
            str = str.replace("{donate_out}", "已核实");
        }
        STR += str
    }
    STR += "</tbody>";
    //将上面构造的字符串插入到table标签中
    donate_tbody.innerHTML += STR;
    beautiful();
});
function beautiful() {
    //样式美化
    console.log("你好！");
    var arrayList = document.getElementsByTagName("tr");
    var pageText = document.getElementsByTagName("p")[0].innerHTML;
    var personNum = arrayList.length - 1, sumDonate = 0;
    var nowDate = new Date;
    for (var i = 1; i < arrayList.length; i++) {
        sumDonate += Number(arrayList[i].getElementsByTagName("td")[2].innerHTML);
        var payWay = arrayList[i].getElementsByTagName("td")[1].innerHTML;
        var outWay = arrayList[i].getElementsByTagName("td")[3].innerHTML;
        if (payWay == "微信") {
            document.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].style.color = "rgb(60,176,53)"
        } else {
            document.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].style.color = "rgb(2,161,226)"
        }
        document.getElementsByTagName("tr")[i].getElementsByTagName("td")[3].innerHTML = "";
        console.log();
        if (outWay != "待核实") {
            document.getElementsByTagName("tr")[i].getElementsByTagName("td")[3].innerHTML += "<span class='inline-tag blue'>" + outWay + "</span>&nbsp;"
        } else {
            document.getElementsByTagName("tr")[i].getElementsByTagName("td")[3].innerHTML += "<span class='inline-tag green'>" + outWay + "</span>&nbsp;"
        }
        var donatMoney = arrayList[i].getElementsByTagName("td")[2].innerHTML;
        document.getElementsByTagName("tr")[i].getElementsByTagName("td")[2].innerHTML = donatMoney + "￥"
    }
    nowDate = (nowDate.getMonth() + 1) + "/" + nowDate.getDate() + "/" + nowDate.getFullYear();
    document.getElementsByTagName("p")[0].innerHTML = pageText.replace(/nowDate/, nowDate).replace(/personNum/, personNum).replace(/sumDonate/, sumDonate.toFixed(2))
};
