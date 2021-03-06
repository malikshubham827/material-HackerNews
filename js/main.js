
/* Helper Functions */
var relativeTimeArr = [];
function processTime(createdAt) {
    relativeTimeArr = [];
    var timeArr = createdAt.split(' ');

    var arr1 = timeArr[0].split('/');
    relativeTimeArr.push(parseInt(arr1[2]));
    relativeTimeArr.push(parseInt(arr1[0]));
    relativeTimeArr.push(parseInt(arr1[1]));

    var arr2 = timeArr[1].split(':');
    for (var i = 0; i < 2; i++) {
        relativeTimeArr.push(parseInt(arr2[i]));
    }
}

// Courtesy/Reference: Stackoverflow.com (http://bit.ly/1S8vChj)
function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

$(document).ready(function () {
    
    var url = 'http://starlord.hackerearth.com/edfora/hackernews';
    $.getJSON(url, function (data) {
        for (var i = 1; i < data.length; i++) {
            processTime(data[i].created_at);
            var parameters = {
                createdAt: data[i].created_at,
                id: data[i].id,
                newsCounter: i,
                title: data[i].title,
                num_points: data[i].num_points,
                author: data[i].author,
                relativeTime: moment(relativeTimeArr).fromNow(true),
                url: data[i].url,
                domain: extractDomain(data[i].url),
                num_comments: data[i].num_comments
            }
            var template = $('#hn-card').html();
            var html = Mustache.render(template, parameters);
            // if(i==1)    console.log(html);
            $('.list').append(html);
            // console.log(relativeTimeArr);
        }

        var options = {
            valueNames: ['relativeTime', 'num_comments', 'num_points', 'title']
        };
        var listObj = new List('list-wrapper', options);
        // console.log(listObj);
        // console.log(listObj.get('num_comments', 12));
        // console.log(listObj.search('You'));
        $('[data-sort="num_comments"]').click(function(){
            // console.log('hello');
            var text = $(this).children()[0].innerHTML;
            if (text === "arrow_upward") {
                $(this).children()[0].innerHTML = "arrow_downward";
            } else {
                $(this).children()[0].innerHTML = "arrow_upward";
            }
        });

        $('[data-sort="num_points"]').click(function(){
            // console.log('hello');
            var text = $(this).children()[0].innerHTML;
            if (text === "arrow_upward") {
                $(this).children()[0].innerHTML = "arrow_downward";
            } else {
                $(this).children()[0].innerHTML = "arrow_upward";
            }
        });

        $('[data-sort="relativeTime"]').click(function(){
            // console.log('hello');
            var text = $(this).children()[0].innerHTML;
            if (text === "arrow_upward") {
                $(this).children()[0].innerHTML = "arrow_downward";
            } else {
                $(this).children()[0].innerHTML = "arrow_upward";
            }
        });
    });
});