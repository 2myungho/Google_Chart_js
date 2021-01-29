window.onload = function () {
    google.charts.load('current', { 'packages': ['line', 'corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    var data;

    function drawChart() {

        const chartDiv = document.getElementById('chart_div');

        data = new google.visualization.DataTable();
        data.addColumn('date', 'Month');
        data.addColumn('number', "평균 기온");
        data.addColumn('number', "평균 습도");

        const chart_data = []
        for (let i = 0; i < 12; i++) {
            let tem = document.getElementById(`tem${i}`).value;
            let hum = document.getElementById(`hum${i}`).value;
            tem = Number(tem);
            hum = Number(hum);
            chart_data.push([new Date('2020', i), tem, hum]);
        }

        data.addRows(chart_data);
        
        var classicOptions = {
            title: '[평균 온도]는 -50 ~ 50 사이의 수, [평균 습도]는 0 ~ 100 사이의 수만 입력 가능합니다. ',
            width: '100%',
            height: 700,
            // 좌우 각 축에 vAxes 번호와 일치하는 축을 제공합니다.
            series: {
                0: { targetAxisIndex: 0 },
                1: { targetAxisIndex: 1 }
            },
            vAxes: {
                // 각 축에 제목을 추가합니다.
                0: { title: '평균 기온 ( ℃ )' },
                1: { title: '평균 습도 ( % )' }
            },
            hAxis: {
              format : 'yyyy.MM'
            },
            vAxis: {
                //각 축 최대 값 지정
                viewWindow: {
                    max: 100
                }
            }
        };

        function drawClassicChart() {
            var classicChart = new google.visualization.LineChart(chartDiv);
            classicChart.draw(data, classicOptions);
            //차트 반응형 작업
            window.addEventListener('resize',drawChart,false);
        }

        drawClassicChart();
    }
    
    //변경 적용
    const submit = document.getElementById('input_submit')
    submit.addEventListener("click", input_submit);
    function input_submit(){
        //차트 변경 시점
        drawChart();
    }

    //랜덤 생성
    const random = document.getElementById('random_submit')
    random.addEventListener("click", random_add);
    function random_add() {
        for (let i = 0; i < 12; i++) {
            let tem = document.getElementById(`tem${i}`);
            let hum = document.getElementById(`hum${i}`);

            //랜덤 생성
            let tem_random = Math.floor(Math.random() * (50 - (-50)) + (-50)); //평균 기온은 -50 ~ 50도 까지만 생성
            let hum_random = Math.floor(Math.random() * 100); //습도는 0% ~ 100% 까지 생성
            //input value 변경
            tem.value = tem_random;
            hum.value = hum_random;
        }
        //차트 변경 시점
        drawChart();
    }
} 
