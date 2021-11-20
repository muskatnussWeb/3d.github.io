import { Item } from './item.js';
import { Camera } from './camera.js'
import { buildSphere } from './sphere.js';

const sphere = buildSphere(80, 100, 0.4);
const plan = {
    position: [-1.5, 0, -10, 0, 0, -10, 0, 0, 0, -1.5, 0, 0, 0, 0, -10, 1.5, 0, -10, 1.5, 0, 0, 0, 0, 0],
    normal: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    indices: [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]
};
const g = 9.8;
const m = 1.5;
const v0 = 6;

class Game {

    constructor(gl) {
        this.camera = new Camera();
        this.jumping = false;
        this.itemList = [new Item(gl, plan, [1.0, 0.75, 0.0]), new Item(gl, sphere, [1.0 / 2, 0.85 / 2, 0.6 / 2])];
        this.init();
        this.t = 0;
    }

    init() {
        this.camera.translate(0, 1, 0);
        this.itemList[0].applyGradient();
        this.itemList[0].translate(0, 0, 0);
        this.itemList[1].translate(0, 0.4, -3);
        this.itemList[1].rotate(0, 0, Math.PI / 2);
    }

    input(){
        if(!this.jumping){
            this.jumping = true;
        }
    }

    update() {
        if(this.jumping){
            this.t += 1/60;
            if(Y(this.t) <= 0){
                this.jumping = false;
                this.t = 0;
                this.itemList[1].position[1] = 0.4;
                this.itemList[1].translate(0, 0, 0);
            }
            else{
                this.itemList[1].position[1] = Y(this.t)+0.4;
            }
        }
    }

}

function Y(t){
    return -1/2*m*g*t**2+v0*t;
}
function generateBlock(width, height, depth){
    let data = {
        position: [],
        normal: [],
        indices: []
    };
    let position = [
        // Front face
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,
        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,
        // Bottom face
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,
        // Right face
         1.0, -1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0,  1.0,  1.0,
         1.0, -1.0,  1.0,
        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
    ];
    const indices = [
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // back
        8,  9,  10,     8,  10, 11,   // top
        12, 13, 14,     12, 14, 15,   // bottom
        16, 17, 18,     16, 18, 19,   // right
        20, 21, 22,     20, 22, 23,   // left
    ];
    let normal = get4([0, 0, 1]);
    normal = normal.concat(get4([0, 0, -1]));
    normal = normal.concat(get4([0, 1, 0]));
    normal = normal.concat(get4([0, -1, 0]));
    normal = normal.concat(get4([1, 0, 0]));
    normal = normal.concat(get4([-1, 0, 0]));
    console.log(normal);
    for(let i = 0; i < positions.length; i += 3){
        positions[i] *= width/2;
        positions[i+1] *= height/2;
        positions[i+2] *= depth/2;
    }
    return data;
}
function get4(arr){
    let newArr = [];
    for(let i = 0; i < 4; i++){
        newArr = newArr.concat(arr);
    }
    return newArr;
}
export { Game };