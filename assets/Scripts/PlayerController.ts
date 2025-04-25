import { _decorator, Component, input, Input, EventMouse, Vec3, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    private _startJump = false
    private _jumptime = 0.2
    private _currJumpTime = 0
    private _jumpSpeed = 0
    private _targetPos = new Vec3()
    private _curPos = new Vec3()
    @property(Animation)
    public bodyAnim: Animation = null
    start() {
        //input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
    }
    public setIsCanControll(value:boolean){
        if(value){
            input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        }else{
            input.off(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        }
    }
    onMouseDown(event: EventMouse) {
        console.log(event.getButton())
        if (event.getButton() == 0) {
            this.jumpBystep(1);
        } else if (event.getButton() == 2) {
            this.jumpBystep(2);
        }
    }
    jumpBystep(step: number) {
        if (this._startJump) {
            return
        }
        const animName = step == 1 ? 'JumpOneStep' : 'JumpTwoStep'
        const animState = this.bodyAnim.getState(animName);
        this._jumptime = animState.duration

        // const curPos=this.node.position
        // this.node.setPosition(curPos.x+40*step,curPos.y,curPos.z)
        const moveLength = step * 40
        this._startJump = true
        this._currJumpTime = 0
        this._jumpSpeed = moveLength / this._jumptime
        this._curPos = this.node.position
        this.node.getPosition(this._curPos)
        //this._targetPos=new Vec3(this._curPos.x+step*40,this._curPos.y,this._curPos.z)
        Vec3.add(this._targetPos, this._curPos, new Vec3(moveLength, 0, 0))
        //    if(step==1){
        //     this.bodyAnim.play("JumpOneStep")
        //    }else if(step==2){
        //     this.bodyAnim.play("JumpTwoStep")
        //    }
        this.bodyAnim.play(animName)

    }

    update(dt: number) {
        if (this._startJump) {
            this._currJumpTime += dt
            if (this._currJumpTime > this._jumptime) {
                console.log("stop jump:" + this._startJump)
                this._startJump = false
                this.node.setPosition(this._targetPos)
            } else {
                // }else{
                const curPos = this.node.position
                console.log("jump")
                this.node.setPosition(curPos.x + this._jumpSpeed * dt, curPos.y, curPos.z)
            }
        }
    }
    protected onDestroy(): void {
        input.off(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);

    }
}


