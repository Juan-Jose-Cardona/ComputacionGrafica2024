function vector(){
    //alert("calculate")
    //obtener valores inputs

    //var es para variable global
    //let es para que exista solo en la funcion
    //const es para variable constante

    let ax = document.getElementById("PointAX").value;
    let ay = document.getElementById("PointAY").value;
    let az = document.getElementById("PointAZ").value;

    let bx = document.getElementById("PointBX").value;
    let by = document.getElementById("PointBY").value;
    let bz = document.getElementById("PointBZ").value;

    //alert("("+ax+","+ay+","+az+")");
    //alert("("+bx+","+by+","+bz+")");

    let vx = bx-ax,
        vy = by-ay,
        vz = bz-az;

    //alert("( "+ vx + ", " + vy + ", " + vz +" )");

    let vectorFinal = `(${vx},${vy},${vz})`;

    document.getElementById("result").innerHTML = vectorFinal;

    //alert(vectorFinal);
    
}

function sumar(){
    //alert("calculate")
    //obtener valores inputs

    //var es para variable global
    //let es para que exista solo en la funcion
    //const es para variable constante

    let ux = document.getElementById("VectorUX").value;
    let uy = document.getElementById("VectorUX").value;
    let uz = document.getElementById("VectorUX").value;

    let vx = document.getElementById("VectorVX").value;
    let vy = document.getElementById("VectorVX").value;
    let vz = document.getElementById("VectorVX").value;

    //alert("("+ax+","+ay+","+az+")");
    //alert("("+bx+","+by+","+bz+")");

    let uvx = ux+vx,
        uvy = uy+vy,
        uvz = uz+vz;

    //alert("( "+ vx + ", " + vy + ", " + vz +" )");

    let vectorSumaFinal = `(${uvx},${uvy},${uvz})`;

    document.getElementById("resultadoSuma").innerHTML = vectorSumaFinal;

    //alert(vectorFinal);
    
}