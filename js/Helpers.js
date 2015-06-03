/**
 * Created by Tiago on 23/03/2015.
 */

CGHLab.Helpers = {

    deg2rad: function (angle) {
        var rad = angle * (Math.PI) / 180;
        return rad;
    },

    rad2deg: function (angle) {
        var deg = angle * 180 / (Math.PI);
        return deg;
    },

    makeTextSprite: function( message, parameters )
    {
        if ( parameters === undefined ) parameters = {};

        var fontface = parameters.hasOwnProperty("fontface") ?
            parameters["fontface"] : "Arial";

        var fontsize = parameters.hasOwnProperty("fontsize") ?
            parameters["fontsize"] : 18;

        var borderThickness = parameters.hasOwnProperty("borderThickness") ?
            parameters["borderThickness"] : 4;

        var borderColor = parameters.hasOwnProperty("borderColor") ?
            parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };

        var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
            parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

        //var spriteAlignment = THREE.SpriteAlignment.topLeft;

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = "Bold " + fontsize + "px " + fontface;

        // get size data (height depends only on font size)
        var metrics = context.measureText( message );
        var textWidth = metrics.width;

        // background color
        context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
        + backgroundColor.b + "," + backgroundColor.a + ")";
        // border color
        context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
        + borderColor.b + "," + borderColor.a + ")";

        context.lineWidth = borderThickness;
        CGHLab.Helpers.roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
        // 1.4 is extra height factor for text below baseline: g,j,p,q.

        // text color
        context.fillStyle = "rgba(0, 0, 0, 1.0)";

        context.fillText( message, borderThickness, fontsize + borderThickness);

        // canvas contents will be used for a texture
        var texture = new THREE.Texture(canvas)
        texture.needsUpdate = true;

        var spriteMaterial = new THREE.SpriteMaterial(
            { map: texture } );
        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set(100,50,1.0);
        return sprite;
    },

    // function for drawing rounded rectangles
    roundRect: function(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    },

    addMainPerspectiveInfo: function(){
        var infoBox = document.getElementById('infoBox');
        var para = document.createElement("P");
        var text = document.createTextNode("You are now on the MAIN PERSPECTIVE.");
        para.appendChild(text);
        infoBox.appendChild(para);

        var para2 = document.createElement("P");
        var text2 = document.createTextNode("Use your mouse to navigate the scene.");
        para2.appendChild(text2);
        infoBox.appendChild(para2);

        var para3 = document.createElement("P");
        var text3 = document.createTextNode("Use the panel on your right to interact with the scene:");
        para3.appendChild(text3);
        infoBox.appendChild(para3);

        var list = document.createElement("UL");
        var elem = document.createTextNode("There are several different perspectives of the scene that you can choose;");
        var elem2 = document.createTextNode("You can turn on and off the laser to see what appends. The laser has two types, a simple one and animated one where it is possible to see the wavefronts moving;");
        var elem3 = document.createTextNode("You can change the object to see different interference patterns being created;");
        var elem4 = document.createTextNode("It is possible to change the wavelength of the reference wave and the angle that it makes with the holographic plate;");
        var elem5 = document.createTextNode("The labels are optional, they can be turn off.");
        var elemsList = [elem, elem2, elem3, elem4, elem5];
        var i;
        for(i = 0; i < elemsList.length; i++){
            var listElem = document.createElement("LI");
            listElem.appendChild(elemsList[i]);
            list.appendChild(listElem);
        }
        infoBox.appendChild(list);

    },

    addObjectPerspectiveInfo: function(){
        var infoBox = document.getElementById('infoBox');
        var para = document.createElement("P");
        var text = document.createTextNode("You are now on the OBJECT PERSPECTIVE.");
        para.appendChild(text);
        infoBox.appendChild(para);

        var para2 = document.createElement("P");
        var text2 = document.createTextNode("Use your mouse to navigate the scene.");
        para2.appendChild(text2);
        infoBox.appendChild(para2);

        var para3 = document.createElement("P");
        var text3 = document.createTextNode("Use the panel on your right to interact with the scene:");
        para3.appendChild(text3);
        infoBox.appendChild(para3);

        var list = document.createElement("UL");
        var elem = document.createTextNode("There are several different perspectives of the scene that you can choose;");
        var elem2 = document.createTextNode("You can turn on and off the laser to see what appends. The laser has two types, a simple one and animated one where it is possible to see the wavefronts moving;");
        var elem3 = document.createTextNode("If you choose to see the animated laser on this perspective another option will appear. " +
        "The \"LP Wave Sending Type\" option allow you to choose how the light points send their waves." +
        "The \"All Together\" option send all waves at the same time, while the \"Collision Detection\" option only send the wave when the wavefront passes through the point." +
        "The \"Collision Detection\" option represents better the reality, however, requires more computing power to represent. If you don't have a powerful computer don't use this option." +
        "Have in attention that both options produce the same interference pattern;");
        var elem4 = document.createTextNode("You can change the object to see different interference patterns being created. On this perspective you can also change the level of detail of the object, giving it more or less light points. " +
        "Have in attention that more light points will need more computing power if the animated laser is on;");
        var elem5 = document.createTextNode("The labels are optional, they can be turn off.");
        var elemsList = [elem, elem2, elem3, elem4, elem5];
        var i;
        for(i = 0; i < elemsList.length; i++){
            var listElem = document.createElement("LI");
            listElem.appendChild(elemsList[i]);
            list.appendChild(listElem);
        }
        infoBox.appendChild(list);

    },

    addPlatePerspectiveInfo: function(){
        var infoBox = document.getElementById('infoBox');
        var para = document.createElement("P");
        var text = document.createTextNode("You are now on the PLATE PERSPECTIVE.");
        para.appendChild(text);
        infoBox.appendChild(para);

        var para2 = document.createElement("P");
        var text2 = document.createTextNode("This perspective focus on the plate so mouse navigation is disable.");
        para2.appendChild(text2);
        infoBox.appendChild(para2);

        var para3 = document.createElement("P");
        var text3 = document.createTextNode("Use the panel on your right to change the parameters that alter the interference pattern:");
        para3.appendChild(text3);
        infoBox.appendChild(para3);

        var list = document.createElement("UL");
        var elem = document.createTextNode("There are several different perspectives of the scene that you can choose;");
        var elem2 = document.createTextNode("You can change the object to see different interference patterns being created. On this perspective you can also change the level of detail of the object, giving it more or less light points. " +
        "Have in attention that more light points will need more computing power if the animated laser is on;");
        var elem3 = document.createTextNode("It is possible to change the wavelength of the reference wave and the angle that it makes with the holographic plate;");
        var elem4 = document.createTextNode("The labels are optional, they can be turn off.");
        var elemsList = [elem, elem2, elem3, elem4];
        var i;
        for(i = 0; i < elemsList.length; i++){
            var listElem = document.createElement("LI");
            listElem.appendChild(elemsList[i]);
            list.appendChild(listElem);
        }
        infoBox.appendChild(list);

    },

    eraseInfo: function(){
        var infoBox = document.getElementById('infoBox');

        while(infoBox.hasChildNodes()){
            infoBox.removeChild(infoBox.childNodes[0]);
        }
    }
};
