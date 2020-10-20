/**
 * How to use
 * 1. Load data.
 *
 * 2. Parse data.
 *    factory.parseDragonBonesData();
 *    factory.parseTextureAtlasData();
 *
 * 3. Build armature.
 *    armatureDisplay = factory.buildArmatureDisplay("armatureName");
 *
 * 4. Play animation.
 *    armatureDisplay.animation.play("animationName");
 *
 * 5. Add armature to stage.
 *    addChild(armatureDisplay);
 */
class HelloDragonBones extends BaseDemo {
    public constructor() {
        super();

        this._resources.push(
            // "resource/mecha_1002_101d_show/mecha_1002_101d_show_ske.json",
            "Ded_5_ske.dbbin",
            "Ded_5_ske.json",
            "Ded_5_ske.png"
        );
    }

    protected _onStart(): void {
        const factory = dragonBones.ThreeFactory.factory;
        // factory.parseDragonBonesData(this._pixiResource["resource/mecha_1002_101d_show/mecha_1002_101d_show_ske.json"].data);
        factory.parseDragonBonesData(this._loadedResources["Ded_5_ske.dbbin"]);
        factory.parseTextureAtlasData(this._loadedResources["Ded_5_ske.json"], this._loadedResources["Ded_5_ske.png"]);

        const armatureDisplay = factory.buildArmatureDisplay("Ded", "mDed_5");
        armatureDisplay.animation.play("idle");

        armatureDisplay.position.setX(0.0);
        armatureDisplay.position.setY(200.0);
        this.add(armatureDisplay);
    }
}