/**
 * Created by TiagoLuís on 02/03/2015.
 */

CGHLab.LightPoint = function( x, y, z, phase)
{
    this.position = new THREE.Vector4(x, y, z, phase);
};

CGHLab.LightPoint.prototype = {

    constructor: CGHLab.LightPoint
};
