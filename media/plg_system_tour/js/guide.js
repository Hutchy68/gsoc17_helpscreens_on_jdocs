Joomla = window.Joomla || {};
(function (Joomla, window) {
    document.addEventListener('DOMContentLoaded', function() {
        if(window.location.href.indexOf("&")>-1) {
            var URLsplit = window.location.href.split('&');
            var option = URLsplit[0].split("option=")[1];
            var view = URLsplit[1].split("view=")[1];
            var layout = '';
            var filename = '';
            var URL = '';
            if (option)  //case if their is presence of two paramteres and one of them is option
            {
                filename = option;
                if (view)         //case if their is presence of two paramteres and they are view and option
                {
                    filename = filename + '-' + view;
                }
                if ((window.location.href.indexOf("layout=") > 0))   //case if their is presence of three paramteres and they are view and option and layout
                {
                    layout = URLsplit[2].split("layout=")[1];
                    filename = filename + '-' + layout;
                }
                filename = filename + '.' + 'json';//made the file name to be fetched out
                URL = option + '/' + filename; // path from where the file to be fetched
            }
        }
        else
        {
            option = location.search.split('option=')[1];
            filename =  option + '.' + 'json';
            URL =  option +  '/' + filename;
        }
        var btn= document.createElement('button');
        btn.classList.add('btn');
        btn.classList.add('btn-sm');
        btn.classList.add('btn-outline-primary');
        btn.setAttribute('id', 'startTourBtn');
        btn.innerHTML = '<span class="icon"></span>Tour_Vanilla</button>';
        document.getElementById('toolbar').appendChild(btn);
        Joomla.request(  {
            url: 'https://yveshoppe.de/jdocsapi/fr/jsonNotFound.json',
            method: 'GET',
            data:    '',
            perform: true,
            onSuccess: function(data) {
                var tour = {
                    id: 'hello-hopscotch',
                    steps: JSON.parse(data).items

                };
                document.getElementById("startTourBtn").addEventListener('click', function () {
                    hopscotch.startTour(tour);
                });
            },
            onError : function() {
                Joomla.request({
                    url: window.location.protocol + '//' + window.location.host + '/' + window.location.pathname.split('/')[1] + '/media/guide/' + navigator.language + '/jsonNotFound.json' ,
                    method: 'GET',
                    data:    '',
                    perform: true,
                    onSuccess: function(data)
                    {
                        var tour = {
                            id: 'hello-hopscotch',
                            steps: JSON.parse(data).items
                        };
                        document.getElementById("startTourBtn").addEventListener('click', function () {
                            hopscotch.startTour(tour);
                        });
                    }
                });
            }
        });
    });
}(Joomla, window));
