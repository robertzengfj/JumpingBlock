import { _decorator, Component, Node,input,Input,EventMouse } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    private _startJump=false
    private _jumptime=0.2
    private _currJumpTime=0
    private _jumpSpeed=0
    start() {
        input.on(Input.EventType.MOUSE_DOWN,this.onMouseDown,this);
    }
    onMouseDown(event:EventMouse){
        console.log(event.getButton())
        if(event.getButton()==0){
            this.jumpBystep(1);
        }else if(event.getButton()==2){
            this.jumpBystep(2);
        }
    }
    jumpBystep(step:number){
        // const curPos=this.node.position
        // this.node.setPosition(curPos.x+40*step,curPos.y,curPos.z)
        this._startJump=true
        this._currJumpTime=0
        this._jumpSpeed=40*step/this._jumptime
    }

    update(dt: number) {
        if(this._startJump){
          this._currJumpTime+=dt
          if(this._currJumpTime>this._jumptime){
            console.log("stop jump:"+this._startJump)
            this._startJump=false

          }else{
       // }else{
            const curPos=this.node.position
            console.log("jump")
            this.node.setPosition(curPos.x+this._jumpSpeed*dt,curPos.y,curPos.z)
          }
        }   
    }
    protected onDestroy(): void {
        input.off(Input.EventType.MOUSE_DOWN,this.onMouseDown,this);
        
    }
}


