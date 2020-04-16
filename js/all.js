$(document).ready(function () {

    // 建立DOM節點
    var place = document.getElementById('areaId');
    var hotplace = document.querySelector('.popList');
    var title = document.querySelector('.place-name');
    var detail = document.querySelector('.cardSection');
    var str =''; 

    //selector資料
    var zoneData = ["三民區", "內門區", "美濃區", "大樹區", "小港區", "六龜區", "仁武區", "左營區", "田寮區", "永安區", "甲仙區", "鼓山區", "杉林區", "那瑪夏", "岡山區", "高雄市", "前鎮區", "新興區", "苓雅區", "茂林區", "茄萣區", "梓官區", "旗津區", "桃源區", "楠梓區", "前金區", "鳳山區"];
    var zoneStr = "";
    zoneData.sort();

    var zoneLen = zoneData.length;
    for (var i=0; i<zoneLen; i++) {
        if (i == 0) {
            zoneStr = '<option value="' + zoneData[i] + '" disabled selected>- - 請選擇行政區- -</option>';
        }
        zoneStr += '<option value="' + zoneData[i] + '">' + zoneData[i] + '</option>';
    }
    place.innerHTML = zoneStr; 

    //建立監聽
    place.addEventListener('change',filter,false);
    hotplace.addEventListener('click', hotfilter, false); 

    //selector事件
    function filter(e) {
        e.preventDefault();
        str = place.value;
        title.textContent = str;
        detail.innerHTML = "";
        getData();
    }

    //熱門景點按鈕事件
    function hotfilter(e){
        e.preventDefault();
        if(e.target.nodeName == "A"){
            str = e.target.textContent;
            title.textContent = str;
            detail.innerHTML = "";
            getData();
        }
    }

    // 向伺服器要資料，readyState = 4後顯示在網頁上
    function getData(){
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
        xhr.send(null);

        xhr.onload = function(){
            //readyState=4後觸發
            var a = JSON.parse(xhr.responseText).result.records;
            var len = a.length;
            for(var i=0; i<len; i++) {
                if(a[i].Zone == str){
                    detail.innerHTML += '<div class="sceneCard"><div class="cardHeader"><img src="' + a[i].Picture1 + '" alt="" class="topImg"><div class="topText"><h3>' + a[i].Name + '</h3><span>' + a[i].Zone + '</span></div></div><div class="cardBody"><div class="openTime mb-16"><div class="icon-wrap"><img src="images/icons_clock.png" alt=""></div><p>' + a[i].Opentime + '</p></div><div class="address mb-16"><div class="icon-wrap"><img src="images/icons_pin.png" alt=""></div><p>' + a[i].Add + '</p></div><div class="flex-wrap"><div class="phone"><div class="icon-wrap"><img src="images/icons_phone.png" alt=""></div><p>' + a[i].Tel + '</p></div><div class="free"><div class="icon-wrap"><img src="images/icons_tag.png" alt=""></div><p>' + a[i].Ticketinfo +'</p></div></div></div></div>';
                }
            }
        }
    }

    // goTop goDown 按鈕功能
    $('.goTop').click(function () {
        $('html,body').animate(
            {
                scrollTop: 0
            },
            800
        );
        return false;
    });

    $('.goDown').click(function () {
        $('html,body').animate(
            {
                scrollTop: $('#downSection').offset().top
            },
            800
        );
        return false;
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.goTop').fadeIn('fast');
        } else {
            $('.goTop')
                .stop()
                .fadeOut('fast');
        }
    });
});
