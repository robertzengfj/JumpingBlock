import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

enum BlockType {
    BT_NONE,
    BT_WHITE
}

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Prefab)
    public boxPrefab: Prefab = null;
    @property()
    public roadLength = 50;
    private _road: BlockType[] = [];

    start() {
        this.generateRoad();
    }

    update(deltaTime: number) {

    }
    generateRoad() {
        this.node.removeAllChildren();
        this._road = []
        this._road.push(BlockType.BT_WHITE);
        for (let i = 1; i < this.roadLength; i++) {
            if (this._road[i - 1] === BlockType.BT_NONE) {
                this._road.push(BlockType.BT_WHITE);

            } else {
                this._road.push(Math.round(Math.random()))
            }
        }
        for (let j = 1; j < this.roadLength; j++) {
            if (this._road[j] == BlockType.BT_WHITE) {
                const box = instantiate(this.boxPrefab);
                box.setParent(this.node);
                box.setPosition(j*40, 0, 0);
                
            }
        }
    }
}


