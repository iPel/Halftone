~function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var input = document.getElementById('input');
    var img = document.getElementById('img');

    function dot(x, y, r) {
        context.fillStyle = '#000';
        context.beginPath();
        context.arc(x, y, r, 0, 2 * Math.PI);
        context.fill();
    }

    function main() {
        input.addEventListener('input', function(e) {
            var url = URL.createObjectURL(e.target.files[0]);
            img.src = url;
        }, false);
        img.addEventListener('load', function(e) {
            var tmpCavnas = document.createElement('canvas');
            tmpCavnas.width = canvas.width / 5;
            tmpCavnas.height = canvas.height / 5;
            // document.body.appendChild(tmpCavnas);
            var tmpContext = tmpCavnas.getContext('2d');
            tmpContext.drawImage(img, 0, 0, tmpCavnas.width, tmpCavnas.height);
            var imageData = tmpContext.getImageData(0, 0, tmpCavnas.width, tmpCavnas.height);
            var data = imageData.data;
            var width = tmpCavnas.width;
            for (var i = 0; i < data.length; i += 4) {
                var y = Math.floor((i >> 2) / width);
                var x = (i >> 2) % width;
                // R*0.299 + G*0.587 + B*0.114
                var gray = Math.round(data[i] * .299 + data[i + 1] * .587 + data[i + 2] * .114);
                dot(x * 5, y * 5, (255 - gray) * 3 / 255);
            }
        }, false);
    }

    main();
}();