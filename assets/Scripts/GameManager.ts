import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

enum BlockType {
    BT_NONE,
    BT_WHITE
}
enum GameState{
    GS_MENU,
    GS_PLAYING,
}

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Prefab)
    public boxPrefab: Prefab = null;
    @property()
    public roadLength = 50;
    private _road: BlockType[] = [];
    @property(PlayerController)
    public playerController: PlayerController = null;

    setCurState(value: GameState) {
       if(value== GameState.GS_MENU){
        this.generateRoad();
        this.playerController.setIsCanControll(false)
       }else if(value== GameState.GS_PLAYING){
        this.playerController.setIsCanControll(true)
       }

    }

    start() {
      this.setCurState(GameState.GS_MENU)
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


