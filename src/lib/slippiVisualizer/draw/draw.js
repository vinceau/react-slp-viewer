import Vec2D from "../utils/Vec2D";

// SETUP LAYERS
// export let bg1 = 0;
// export let bg2 = 0;
// export let fg1 = 0;
// export let fg2 = 0;
// export let ui = 0;
export const c = 0;
export const canvasMain = 0;
// export const layers = {
//     BG1: 0,
//     BG2: 0,
//     FG1: 0,
//     FG2: 0,
//     UI: 0
// };
export const layers = new Map();
export const layersBg = new Map();

const layerSwitches = {
    BG1: true,
    BG2: true,
    FG1: true,
    FG2: true,
    UI: true
};

export function clearScreen(id) {
    layersBg
        .get(id)
        .bg2.clearRect(
            0,
            0,
            layers.get(id).BG2.width,
            layers.get(id).BG2.height
        );
    layersBg
        .get(id)
        .fg2.clearRect(
            0,
            0,
            layers.get(id).FG2.width,
            layers.get(id).FG2.height
        );
    layersBg
        .get(id)
        .ui.clearRect(0, 0, layers.get(id).UI.width, layers.get(id).UI.height);
}

export function setupLayers(id) {
    const BG1 = document.getElementById(`background1Canvas-${id}`);
    const bg1 = BG1.getContext("2d");
    const BG2 = document.getElementById(`background2Canvas-${id}`);
    const bg2 = BG2.getContext("2d");
    const FG1 = document.getElementById(`foreground1Canvas-${id}`);
    const fg1 = FG1.getContext("2d");
    const FG2 = document.getElementById(`foreground2Canvas-${id}`);
    const fg2 = FG2.getContext("2d");
    const UI = document.getElementById(`uiCanvas-${id}`);
    const ui = UI.getContext("2d");

    layers.set(id, {
        BG1,
        BG2,
        FG1,
        FG2,
        UI
    });

    layersBg.set(id, {
        bg1,
        bg2,
        fg1,
        fg2,
        ui
    });

    bg1.fillStyle = "rgb(0, 0, 0)";
    bg1.fillRect(0, 0, BG1.width, BG1.height);
}

export function renderToMain() {
    var keys = Object.keys(layers);
    for (var i = 0; i < keys.length; i++) {
        if (layerSwitches[keys[i]]) {
            c.drawImage(layers[keys[i]], 0, 0);
        }
    }
}

export function drawArrayPathCompress(
    can,
    col,
    face,
    tX,
    tY,
    path,
    scaleX,
    scaleY,
    rotate,
    rpX,
    rpY,
    extra
) {
    can.save();
    if (extra !== undefined) {
        extra();
    }
    can.translate(tX - rpX, tY - rpY);
    can.rotate(rotate);

    can.fillStyle = col;
    can.lineWidth = 3;
    can.strokeStyle = col;
    can.beginPath();
    // for each shape
    if (path !== undefined && path !== null && path.length !== undefined) {
        for (var j = 0; j < path.length; j++) {
            // first 2 numbers are starting vector points
            var x = path[j][0] * scaleX * face + rpX;
            var y = path[j][1] * scaleY + rpY;
            can.moveTo(x, y);
            // starting from index 2, each set of 6 numbers are bezier curve coords
            for (var k = 2; k < path[j].length; k += 6) {
                /*can.bezierCurveTo((path[j][k] * scaleX * face) + rpX, (path[j][k + 1] * scaleY) + rpY, (path[j][k + 2] * scaleX *
                face) + rpX, (path[j][k + 3] * scaleY) + rpY, (path[j][k + 4] * scaleX * face) + rpX, (path[j][k + 5] *
                scaleY) + rpY);*/
                can.lineTo(
                    path[j][k] * scaleX * face + rpX,
                    path[j][k + 1] * scaleY + rpY
                );
            }
        }
    }
    can.closePath();
    //can.fill();
    can.stroke();
    can.restore();
}
