"use strict";
var __reflect =
    (this && this.__reflect) ||
    function (t, e, a) {
      (t.__class__ = e),
        a ? a.push(e) : (a = [e]),
        (t.__types__ = t.__types__ ? a.concat(t.__types__) : a);
    },
  __extends =
    (this && this.__extends) ||
    (function () {
      var t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, e) {
            t.__proto__ = e;
          }) ||
        function (t, e) {
          for (var a in e) e.hasOwnProperty(a) && (t[a] = e[a]);
        };
      return function (e, a) {
        function s() {
          this.constructor = e;
        }
        t(e, a),
          (e.prototype =
            null === a
              ? Object.create(a)
              : ((s.prototype = a.prototype), new s()));
      };
    })(),
  BaseDemo = (function (t) {
    function e() {
      var a = t.call(this) || this;
      return (
        (a._loadCount = 0),
        (a._loadingText = new egret.TextField()),
        (a._background = new egret.Bitmap()),
        (a._resources = []),
        (a._resourceMap = {}),
        a._updateLoadingText("Loading 0%"),
        a._resources.push(e.BACKGROUND_URL),
        a.addChild(a._loadingText),
        a.addEventListener(
          egret.Event.ADDED_TO_STAGE,
          function () {
            (a.x = 0.5 * a.stageWidth),
              (a.y = 0.5 * a.stageHeight),
              a._loadResources();
          },
          a
        ),
        a
      );
    }
    return (
      __extends(e, t),
      (e.prototype._updateLoadingText = function (t) {
        (this._loadingText.text = t),
          (this._loadingText.x = 0.5 * -this._loadingText.width),
          (this._loadingText.y = 0.5 * -this._loadingText.height);
      }),
      (e.prototype._loadResources = function () {
        var t = this;
        this._loadCount = this._resources.length;
        for (var a = 0, s = this._resources; a < s.length; a++) {
          var i = s[a];
          RES.getResByUrl(
            i,
            function (a, s) {
              (t._resourceMap[s] = a),
                t._loadCount--,
                0 === t._loadCount
                  ? ((RES.getRes = function (e) {
                      return t._resourceMap[e];
                    }),
                    (t._background.texture = RES.getRes(e.BACKGROUND_URL)),
                    (t._background.x =
                      0.5 * -t._background.texture.textureWidth),
                    (t._background.y =
                      0.5 * -t._background.texture.textureHeight),
                    t.addChild(t._background),
                    t._onStart())
                  : t._updateLoadingText(
                      "Loading " +
                        Math.round(
                          100 * (1 - t._loadCount / t._resources.length)
                        ) +
                        "%"
                    );
            },
            this,
            i.indexOf(".dbbin") > 0 ? RES.ResourceItem.TYPE_BIN : null
          );
        }
      }),
      (e.prototype.createText = function (t) {
        var e = new egret.TextField();
        return (
          (e.size = 20),
          (e.textAlign = egret.HorizontalAlign.CENTER),
          (e.text = t),
          (e.width = this.stageWidth),
          (e.x = 0.5 * -this.stageWidth),
          (e.y = 0.5 * this.stageHeight - 100),
          this.addChild(e),
          e
        );
      }),
      Object.defineProperty(e.prototype, "stageWidth", {
        get: function () {
          return this.stage.stageWidth;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(e.prototype, "stageHeight", {
        get: function () {
          return this.stage.stageHeight;
        },
        enumerable: !0,
        configurable: !0,
      }),
      (e.BACKGROUND_URL = "resource/background.png"),
      e
    );
  })(egret.DisplayObjectContainer);
__reflect(BaseDemo.prototype, "BaseDemo");
var ReplaceSlotDisplay = (function (t) {
  function e() {
    var e = t.call(this) || this;
    return (
      (e._leftWeaponIndex = 0),
      (e._rightWeaponIndex = 0),
      (e._factory = dragonBones.EgretFactory.factory),
      e._resources.push(
        "resource/mecha_1004d_show/mecha_1004d_show_ske.json",
        "resource/mecha_1004d_show/mecha_1004d_show_tex.json",
        "resource/mecha_1004d_show/mecha_1004d_show_tex.png",
        "resource/weapon_1004_show/weapon_1004_show_ske.json",
        "resource/weapon_1004_show/weapon_1004_show_tex.json",
        "resource/weapon_1004_show/weapon_1004_show_tex.png"
      ),
      e
    );
  }
  return (
    __extends(e, t),
    (e.prototype._onStart = function () {
      var t = this;
      this._factory.parseDragonBonesData(
        RES.getRes("resource/mecha_1004d_show/mecha_1004d_show_ske.json")
      ),
        this._factory.parseTextureAtlasData(
          RES.getRes("resource/mecha_1004d_show/mecha_1004d_show_tex.json"),
          RES.getRes("resource/mecha_1004d_show/mecha_1004d_show_tex.png")
        ),
        this._factory.parseDragonBonesData(
          RES.getRes("resource/weapon_1004_show/weapon_1004_show_ske.json")
        ),
        this._factory.parseTextureAtlasData(
          RES.getRes("resource/weapon_1004_show/weapon_1004_show_tex.json"),
          RES.getRes("resource/weapon_1004_show/weapon_1004_show_tex.png")
        ),
        (this._armatureDisplay = this._factory.buildArmatureDisplay(
          "mecha_1004d"
        )),
        this._armatureDisplay.animation.play(),
        (this._armatureDisplay.x = 100),
        (this._armatureDisplay.y = 200),
        this.addChild(this._armatureDisplay),
        this.stage.addEventListener(
          egret.TouchEvent.TOUCH_BEGIN,
          function (e) {
            var a = e.stageX - t.x;
            -150 > a
              ? t._replaceDisplay(-1)
              : a > 150
              ? t._replaceDisplay(1)
              : t._replaceDisplay(0);
          },
          this
        ),
        this.createText(
          "Touch screen left / center / right to relace slot display."
        );
    }),
    (e.prototype._replaceDisplay = function (t) {
      if (-1 === t) {
        this._rightWeaponIndex++,
          (this._rightWeaponIndex %= e.WEAPON_RIGHT_LIST.length);
        var a = e.WEAPON_RIGHT_LIST[this._rightWeaponIndex];
        this._factory.replaceSlotDisplay(
          "weapon_1004_show",
          "weapon",
          "weapon_r",
          a,
          this._armatureDisplay.armature.getSlot("weapon_hand_r")
        );
      } else if (1 === t)
        this._leftWeaponIndex++,
          (this._leftWeaponIndex %= 5),
          (this._armatureDisplay.armature.getSlot(
            "weapon_hand_l"
          ).displayIndex = this._leftWeaponIndex);
      else {
        var s = this._armatureDisplay.armature.getSlot("logo");
        s.display === this._logoText
          ? (s.display = s.rawDisplay)
          : (this._logoText ||
              ((this._logoText = new egret.TextField()),
              (this._logoText.text = "Core Element"),
              (this._logoText.anchorOffsetX = 0.5 * this._logoText.width),
              (this._logoText.anchorOffsetY = 0.5 * this._logoText.height)),
            (s.display = this._logoText));
      }
    }),
    (e.WEAPON_RIGHT_LIST = [
      "weapon_1004_r",
      "weapon_1004b_r",
      "weapon_1004c_r",
      "weapon_1004d_r",
      "weapon_1004e_r",
      "weapon_1004s_r",
    ]),
    e
  );
})(BaseDemo);
__reflect(ReplaceSlotDisplay.prototype, "ReplaceSlotDisplay");
var Main = (function (t) {
  function e() {
    var e = t.call(this) || this;
    return e.addChild(new InverseKinematics()), e;
  }
  return __extends(e, t), e;
})(egret.DisplayObjectContainer);
__reflect(Main.prototype, "Main");
var AnimationBase = (function (t) {
  function e() {
    var e = t.call(this) || this;
    return (
      e._resources.push(
        "resource/progress_bar/progress_bar_ske.json",
        "resource/progress_bar/progress_bar_tex.json",
        "resource/progress_bar/progress_bar_tex.png"
      ),
      e
    );
  }
  return (
    __extends(e, t),
    (e.prototype._onStart = function () {
      var t = dragonBones.EgretFactory.factory;
      t.parseDragonBonesData(
        RES.getRes("resource/progress_bar/progress_bar_ske.json")
      ),
        t.parseTextureAtlasData(
          RES.getRes("resource/progress_bar/progress_bar_tex.json"),
          RES.getRes("resource/progress_bar/progress_bar_tex.png")
        ),
        (this._armatureDisplay = t.buildArmatureDisplay("progress_bar")),
        (this._armatureDisplay.x = 0),
        (this._armatureDisplay.y = 0),
        this.addChild(this._armatureDisplay),
        this._armatureDisplay.addEventListener(
          dragonBones.EventObject.START,
          this._animationEventHandler,
          this
        ),
        this._armatureDisplay.addEventListener(
          dragonBones.EventObject.LOOP_COMPLETE,
          this._animationEventHandler,
          this
        ),
        this._armatureDisplay.addEventListener(
          dragonBones.EventObject.COMPLETE,
          this._animationEventHandler,
          this
        ),
        this._armatureDisplay.addEventListener(
          dragonBones.EventObject.FADE_IN,
          this._animationEventHandler,
          this
        ),
        this._armatureDisplay.addEventListener(
          dragonBones.EventObject.FADE_IN_COMPLETE,
          this._animationEventHandler,
          this
        ),
        this._armatureDisplay.addEventListener(
          dragonBones.EventObject.FADE_OUT,
          this._animationEventHandler,
          this
        ),
        this._armatureDisplay.addEventListener(
          dragonBones.EventObject.FADE_OUT_COMPLETE,
          this._animationEventHandler,
          this
        ),
        this._armatureDisplay.addEventListener(
          dragonBones.EventObject.FRAME_EVENT,
          this._animationEventHandler,
          this
        ),
        this._armatureDisplay.animation.play("idle"),
        this.stage.addEventListener(
          egret.TouchEvent.TOUCH_BEGIN,
          this._touchHandler,
          this
        ),
        this.stage.addEventListener(
          egret.TouchEvent.TOUCH_END,
          this._touchHandler,
          this
        ),
        this.stage.addEventListener(
          egret.TouchEvent.TOUCH_MOVE,
          this._touchHandler,
          this
        ),
        this.createText("Touch to control animation play progress.");
    }),
    (e.prototype._touchHandler = function (t) {
      var e = Math.min(Math.max((t.stageX - this.x + 300) / 600, 0), 1);
      switch (t.type) {
        case egret.TouchEvent.TOUCH_BEGIN:
          this._armatureDisplay.animation.gotoAndStopByProgress("idle", e);
          break;
        case egret.TouchEvent.TOUCH_END:
          this._armatureDisplay.animation.play();
          break;
        case egret.TouchEvent.TOUCH_MOVE:
          if (t.touchDown) {
            var a = this._armatureDisplay.animation.getState("idle");
            a && (a.currentTime = a.totalTime * e);
          }
      }
    }),
    (e.prototype._animationEventHandler = function (t) {
      console.log(
        t.eventObject.animationState.name,
        t.type,
        t.eventObject.name
      );
    }),
    e
  );
})(BaseDemo);
__reflect(AnimationBase.prototype, "AnimationBase");
var AnimationLayer = (function (t) {
  function e() {
    var e = t.call(this) || this;
    return (
      e._resources.push(
        "resource/mecha_1004d/mecha_1004d_ske.json",
        "resource/mecha_1004d/mecha_1004d_tex.json",
        "resource/mecha_1004d/mecha_1004d_tex.png"
      ),
      e
    );
  }
  return (
    __extends(e, t),
    (e.prototype._onStart = function () {
      var t = dragonBones.EgretFactory.factory;
      t.parseDragonBonesData(
        RES.getRes("resource/mecha_1004d/mecha_1004d_ske.json")
      ),
        t.parseTextureAtlasData(
          RES.getRes("resource/mecha_1004d/mecha_1004d_tex.json"),
          RES.getRes("resource/mecha_1004d/mecha_1004d_tex.png")
        ),
        (this._armatureDisplay = t.buildArmatureDisplay("mecha_1004d")),
        this._armatureDisplay.addEventListener(
          dragonBones.EventObject.LOOP_COMPLETE,
          this._animationEventHandler,
          this
        ),
        this._armatureDisplay.animation.play("walk"),
        (this._armatureDisplay.x = 0),
        (this._armatureDisplay.y = 100),
        this.addChild(this._armatureDisplay);
    }),
    (e.prototype._animationEventHandler = function (t) {
      var e = this._armatureDisplay.animation.getState("attack_01");
      e ||
        ((e = this._armatureDisplay.animation.fadeIn("attack_01", 0.1, 1, 1)),
        (e.resetToPose = !1),
        (e.autoFadeOutTime = 0.1),
        e.addBoneMask("chest"),
        e.addBoneMask("effect_l"),
        e.addBoneMask("effect_r"));
    }),
    e
  );
})(BaseDemo);
__reflect(AnimationLayer.prototype, "AnimationLayer");
var BoneOffset = (function (t) {
  function e() {
    var e = t.call(this) || this;
    return (
      e._resources.push(
        "resource/bullet_01/bullet_01_ske.json",
        "resource/bullet_01/bullet_01_tex.json",
        "resource/bullet_01/bullet_01_tex.png"
      ),
      e
    );
  }
  return (
    __extends(e, t),
    (e.prototype._onStart = function () {
      var t = dragonBones.EgretFactory.factory;
      t.parseDragonBonesData(
        RES.getRes("resource/bullet_01/bullet_01_ske.json")
      ),
        t.parseTextureAtlasData(
          RES.getRes("resource/bullet_01/bullet_01_tex.json"),
          RES.getRes("resource/bullet_01/bullet_01_tex.png")
        );
      for (var e = 0; 100 > e; ++e) {
        var a = t.buildArmatureDisplay("bullet_01");
        a.addEventListener(
          dragonBones.EventObject.COMPLETE,
          this._animationHandler,
          this
        ),
          (a.x = 0),
          (a.y = 0),
          this.addChild(a),
          this._moveTo(a);
      }
    }),
    (e.prototype._animationHandler = function (t) {
      this._moveTo(t.eventObject.armature.display);
    }),
    (e.prototype._moveTo = function (t) {
      var e = t.x,
        a = t.y,
        s = Math.random() * this.stageWidth - 0.5 * this.stageWidth,
        i = Math.random() * this.stageHeight - 0.5 * this.stageHeight,
        r = s - e,
        n = i - a,
        o = t.armature.getBone("root"),
        _ = t.armature.getBone("bullet");
      (o.offset.scaleX = Math.sqrt(r * r + n * n) / 100),
        (o.offset.rotation = Math.atan2(n, r)),
        (o.offset.skew = Math.random() * Math.PI - 0.5 * Math.PI),
        (_.offset.scaleX = 0.5 + 0.5 * Math.random()),
        (_.offset.scaleY = 0.5 + 0.5 * Math.random()),
        o.invalidUpdate(),
        _.invalidUpdate(),
        (t.animation.timeScale = 0.5 + 1 * Math.random()),
        t.animation.play("idle", 1);
    }),
    e
  );
})(BaseDemo);
__reflect(BoneOffset.prototype, "BoneOffset");
var BoundingBox = (function (t) {
  function e() {
    var e = t.call(this) || this;
    return (
      (e._helpPointA = new egret.Point()),
      (e._helpPointB = new egret.Point()),
      (e._helpPointC = new egret.Point()),
      e._resources.push(
        "resource/mecha_2903/mecha_2903_ske.json",
        "resource/mecha_2903/mecha_2903_tex.json",
        "resource/mecha_2903/mecha_2903_tex.png",
        "resource/bounding_box_tester/bounding_box_tester_ske.json",
        "resource/bounding_box_tester/bounding_box_tester_tex.json",
        "resource/bounding_box_tester/bounding_box_tester_tex.png"
      ),
      e
    );
  }
  return (
    __extends(e, t),
    (e.prototype._onStart = function () {
      var t = dragonBones.EgretFactory.factory;
      t.parseDragonBonesData(
        RES.getRes("resource/mecha_2903/mecha_2903_ske.json")
      ),
        t.parseTextureAtlasData(
          RES.getRes("resource/mecha_2903/mecha_2903_tex.json"),
          RES.getRes("resource/mecha_2903/mecha_2903_tex.png")
        ),
        t.parseDragonBonesData(
          RES.getRes(
            "resource/bounding_box_tester/bounding_box_tester_ske.json"
          )
        ),
        t.parseTextureAtlasData(
          RES.getRes(
            "resource/bounding_box_tester/bounding_box_tester_tex.json"
          ),
          RES.getRes("resource/bounding_box_tester/bounding_box_tester_tex.png")
        ),
        (this._armatureDisplay = t.buildArmatureDisplay("mecha_2903d")),
        (this._boundingBoxTester = t.buildArmatureDisplay("tester")),
        (this._targetA = this._boundingBoxTester.armature.getSlot(
          "target_a"
        ).display),
        (this._targetB = this._boundingBoxTester.armature.getSlot(
          "target_b"
        ).display),
        (this._line = this._boundingBoxTester.armature.getBone("line")),
        (this._pointA = this._boundingBoxTester.armature.getBone("point_a")),
        (this._pointB = this._boundingBoxTester.armature.getBone("point_b")),
        (this._armatureDisplay.debugDraw = !0),
        (this._armatureDisplay.x = 0),
        (this._armatureDisplay.y = 100),
        (this._boundingBoxTester.x = 0),
        (this._boundingBoxTester.y = 200),
        (this._targetA.armature.inheritAnimation = !1),
        (this._targetB.armature.inheritAnimation = !1),
        (this._line.offsetMode = 2),
        (this._pointA.offsetMode = 2),
        (this._pointB.offsetMode = 2),
        this._armatureDisplay.animation.play("walk"),
        this._boundingBoxTester.animation.play("0"),
        this.addChild(this._armatureDisplay),
        this.addChild(this._boundingBoxTester),
        this.addEventListener(
          egret.Event.ENTER_FRAME,
          this._enterFrameHandler,
          this
        ),
        DragHelper.getInstance().enableDrag(this._targetA),
        DragHelper.getInstance().enableDrag(this._targetB),
        this.createText("Touch to drag bounding box tester.");
    }),
    (e.prototype._enterFrameHandler = function (t) {
      this._boundingBoxTester.localToGlobal(
        this._targetA.x,
        this._targetA.y,
        this._helpPointA
      ),
        this._boundingBoxTester.localToGlobal(
          this._targetB.x,
          this._targetB.y,
          this._helpPointB
        ),
        this._armatureDisplay.globalToLocal(
          this._helpPointA.x,
          this._helpPointA.y,
          this._helpPointA
        ),
        this._armatureDisplay.globalToLocal(
          this._helpPointB.x,
          this._helpPointB.y,
          this._helpPointB
        );
      var e = this._armatureDisplay.armature.containsPoint(
          this._helpPointA.x,
          this._helpPointA.y
        ),
        a = this._armatureDisplay.armature.containsPoint(
          this._helpPointB.x,
          this._helpPointB.y
        ),
        s = this._armatureDisplay.armature.intersectsSegment(
          this._helpPointA.x,
          this._helpPointA.y,
          this._helpPointB.x,
          this._helpPointB.y,
          this._helpPointA,
          this._helpPointB,
          this._helpPointC
        ),
        i = e ? "1" : "0";
      this._targetA.animation.lastAnimationName !== i &&
        (this._targetA.animation.fadeIn(i, 0.2).resetToPose = !1);
      var i = a ? "1" : "0";
      this._targetB.animation.lastAnimationName !== i &&
        (this._targetB.animation.fadeIn(i, 0.2).resetToPose = !1);
      var r = this._targetA.armature.parent.parent,
        n = this._targetB.armature.parent.parent,
        o = n.global.x - r.global.x,
        _ = n.global.y - r.global.y;
      (this._line.offset.x = r.global.x),
        (this._line.offset.y = r.global.y),
        (this._line.offset.scaleX = Math.sqrt(o * o + _ * _) / 100),
        (this._line.offset.rotation = Math.atan2(_, o)),
        this._line.invalidUpdate();
      var i = s ? "1" : "0";
      this._boundingBoxTester.animation.lastAnimationName !== i &&
        (this._boundingBoxTester.animation.fadeIn(i, 0.2).resetToPose = !1),
        s
          ? (this._armatureDisplay.localToGlobal(
              this._helpPointA.x,
              this._helpPointA.y,
              this._helpPointA
            ),
            this._armatureDisplay.localToGlobal(
              this._helpPointB.x,
              this._helpPointB.y,
              this._helpPointB
            ),
            this._boundingBoxTester.globalToLocal(
              this._helpPointA.x,
              this._helpPointA.y,
              this._helpPointA
            ),
            this._boundingBoxTester.globalToLocal(
              this._helpPointB.x,
              this._helpPointB.y,
              this._helpPointB
            ),
            (this._pointA.visible = !0),
            (this._pointB.visible = !0),
            (this._pointA.offset.x = this._helpPointA.x),
            (this._pointA.offset.y = this._helpPointA.y),
            (this._pointB.offset.x = this._helpPointB.x),
            (this._pointB.offset.y = this._helpPointB.y),
            (this._pointA.offset.rotation = this._helpPointC.x),
            (this._pointB.offset.rotation = this._helpPointC.y),
            this._pointA.invalidUpdate(),
            this._pointB.invalidUpdate())
          : ((this._pointA.visible = !1), (this._pointB.visible = !1));
    }),
    e
  );
})(BaseDemo);
__reflect(BoundingBox.prototype, "BoundingBox");
var DragHelper = (function () {
  function t() {
    (this._helpPoint = new egret.Point()),
      (this._dragOffset = new egret.Point()),
      (this._dragDisplayObject = null);
  }
  return (
    (t.getInstance = function () {
      return t._instance;
    }),
    (t.prototype.enableDrag = function (t) {
      (t.touchEnabled = !0),
        t.addEventListener(
          egret.TouchEvent.TOUCH_BEGIN,
          this._dragHandler,
          this
        ),
        t.addEventListener(
          egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,
          this._dragHandler,
          this
        ),
        t.addEventListener(egret.TouchEvent.TOUCH_END, this._dragHandler, this);
    }),
    (t.prototype.disableDrag = function (t) {
      t.removeEventListener(
        egret.TouchEvent.TOUCH_BEGIN,
        this._dragHandler,
        this
      ),
        t.removeEventListener(
          egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,
          this._dragHandler,
          this
        ),
        t.removeEventListener(
          egret.TouchEvent.TOUCH_END,
          this._dragHandler,
          this
        );
    }),
    (t.prototype._dragHandler = function (t) {
      switch (t.type) {
        case egret.TouchEvent.TOUCH_BEGIN:
          if (this._dragDisplayObject) return;
          this._dragDisplayObject = t.target;
          var e = this._dragDisplayObject.parent,
            a = e.armature.getBoneByDisplay(this._dragDisplayObject);
          a &&
            (e.globalToLocal(t.stageX, t.stageY, this._helpPoint),
            2 !== a.offsetMode &&
              ((a.offsetMode = 2),
              (a.offset.x = a.global.x),
              (a.offset.y = a.global.y)),
            (this._dragOffset.x = a.offset.x - this._helpPoint.x),
            (this._dragOffset.y = a.offset.y - this._helpPoint.y),
            this._dragDisplayObject.stage.addEventListener(
              egret.TouchEvent.TOUCH_MOVE,
              this._dragHandler,
              this
            ));
          break;
        case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
        case egret.TouchEvent.TOUCH_END:
          this._dragDisplayObject &&
            (this._dragDisplayObject.stage.removeEventListener(
              egret.TouchEvent.TOUCH_MOVE,
              this._dragHandler,
              this
            ),
            (this._dragDisplayObject = null));
          break;
        case egret.TouchEvent.TOUCH_MOVE:
          if (this._dragDisplayObject) {
            var s = this._dragDisplayObject.parent,
              i = s.armature.getBoneByDisplay(this._dragDisplayObject);
            i &&
              (s.globalToLocal(t.stageX, t.stageY, this._helpPoint),
              (i.offset.x = this._helpPoint.x + this._dragOffset.x),
              (i.offset.y = this._helpPoint.y + this._dragOffset.y),
              i.invalidUpdate());
          }
      }
    }),
    (t._instance = new t()),
    t
  );
})();
__reflect(DragHelper.prototype, "DragHelper");
var DragonBonesEvent = (function (t) {
  function e() {
    var e = t.call(this) || this;
    return (
      e._resources.push(
        "resource/mecha_1004d/mecha_1004d_ske.json",
        "resource/mecha_1004d/mecha_1004d_tex.json",
        "resource/mecha_1004d/mecha_1004d_tex.png"
      ),
      e
    );
  }
  return (
    __extends(e, t),
    (e.prototype._onStart = function () {
      var t = this,
        e = dragonBones.EgretFactory.factory;
      e.parseDragonBonesData(
        RES.getRes("resource/mecha_1004d/mecha_1004d_ske.json")
      ),
        e.parseTextureAtlasData(
          RES.getRes("resource/mecha_1004d/mecha_1004d_tex.json"),
          RES.getRes("resource/mecha_1004d/mecha_1004d_tex.png")
        ),
        e.soundEventManager.addEventListener(
          dragonBones.EventObject.SOUND_EVENT,
          this._soundEventHandler,
          this
        ),
        (this._armatureDisplay = e.buildArmatureDisplay("mecha_1004d")),
        this._armatureDisplay.addEventListener(
          dragonBones.EventObject.COMPLETE,
          this._animationEventHandler,
          this
        ),
        this._armatureDisplay.animation.play("walk"),
        (this._armatureDisplay.x = 0),
        (this._armatureDisplay.y = 100),
        this.addChild(this._armatureDisplay),
        this.stage.addEventListener(
          egret.TouchEvent.TOUCH_BEGIN,
          function () {
            t._armatureDisplay.animation.fadeIn("skill_03", 0.2);
          },
          this
        ),
        this.createText("Touch to play animation.");
    }),
    (e.prototype._soundEventHandler = function (t) {
      var e = t.eventObject;
      console.log(e.name);
    }),
    (e.prototype._animationEventHandler = function (t) {
      var e = t.eventObject;
      "skill_03" === e.animationState.name &&
        this._armatureDisplay.animation.fadeIn("walk", 0.2);
    }),
    e
  );
})(BaseDemo);
__reflect(DragonBonesEvent.prototype, "DragonBonesEvent");
var HelloDragonBones = (function (t) {
  function e() {
    var e = t.call(this) || this;
    return (
      e._resources.push(
        "resource/mecha_1002_101d_show/mecha_1002_101d_show_ske.dbbin",
        "resource/mecha_1002_101d_show/mecha_1002_101d_show_tex.json",
        "resource/mecha_1002_101d_show/mecha_1002_101d_show_tex.png"
      ),
      e
    );
  }
  return (
    __extends(e, t),
    (e.prototype._onStart = function () {
      var t = dragonBones.EgretFactory.factory;
      t.parseDragonBonesData(
        RES.getRes(
          "resource/mecha_1002_101d_show/mecha_1002_101d_show_ske.dbbin"
        )
      ),
        t.parseTextureAtlasData(
          RES.getRes(
            "resource/mecha_1002_101d_show/mecha_1002_101d_show_tex.json"
          ),
          RES.getRes(
            "resource/mecha_1002_101d_show/mecha_1002_101d_show_tex.png"
          )
        );
      var e = t.buildArmatureDisplay("mecha_1002_101d", "mecha_1002_101d_show");
      e.animation.play("idle"), (e.x = 0), (e.y = 200), this.addChild(e);
    }),
    e
  );
})(BaseDemo);
__reflect(HelloDragonBones.prototype, "HelloDragonBones");
var InverseKinematics = (function (t) {
  function e() {
    var e = t.call(this) || this;
    return (
      (e._faceDir = 0),
      (e._aimRadian = 0),
      (e._offsetRotation = 0),
      (e._target = new egret.Point()),
      e._resources.push(
        "resource/mecha_1406/mecha_1406_ske.json",
        "resource/mecha_1406/mecha_1406_tex.json",
        "resource/mecha_1406/mecha_1406_tex.png",
        "resource/floor_board/floor_board_ske.json",
        "resource/floor_board/floor_board_tex.json",
        "resource/floor_board/floor_board_tex.png"
      ),
      e
    );
  }
  return (
    __extends(e, t),
    (e.prototype._onStart = function () {
      var t = dragonBones.EgretFactory.factory;
      t.parseDragonBonesData(
        RES.getRes("resource/mecha_1406/mecha_1406_ske.json")
      ),
        t.parseTextureAtlasData(
          RES.getRes("resource/mecha_1406/mecha_1406_tex.json"),
          RES.getRes("resource/mecha_1406/mecha_1406_tex.png")
        ),
        t.parseDragonBonesData(
          RES.getRes("resource/floor_board/floor_board_ske.json")
        ),
        t.parseTextureAtlasData(
          RES.getRes("resource/floor_board/floor_board_tex.json"),
          RES.getRes("resource/floor_board/floor_board_tex.png")
        ),
        (this._armatureDisplay = t.buildArmatureDisplay("mecha_1406")),
        (this._floorBoard = t.buildArmatureDisplay("floor_board")),
        (this._chestBone = this._armatureDisplay.armature.getBone("chest")),
        (this._leftFootBone = this._armatureDisplay.armature.getBone("foot_l")),
        (this._rightFootBone = this._armatureDisplay.armature.getBone(
          "foot_r"
        )),
        (this._circleBone = this._floorBoard.armature.getBone("circle")),
        (this._floorBoardBone = this._floorBoard.armature.getBone(
          "floor_board"
        )),
        this._armatureDisplay.animation.play("idle"),
        (this._aimState = this._armatureDisplay.animation.fadeIn(
          "aim",
          0.1,
          1,
          0,
          "aim_group"
        )),
        (this._aimState.resetToPose = !1),
        this._aimState.stop(),
        this._floorBoard.animation.play("idle"),
        (this._floorBoard.armature.getSlot(
          "player"
        ).display = this._armatureDisplay),
        (this._floorBoard.x = 0),
        (this._floorBoard.y = 50),
        this.addChild(this._floorBoard);
      var e = egret.sys.TouchHandler.prototype.onTouchMove,
        a = this;
      (egret.sys.TouchHandler.prototype.onTouchMove = function (t, s, i) {
        e.call(this, t, s, i), (a._target.x = t - a.x), (a._target.y = s - a.y);
      }),
        this.addEventListener(
          egret.Event.ENTER_FRAME,
          this._enterFrameHandler,
          this
        ),
        DragHelper.getInstance().enableDrag(
          this._floorBoard.armature.getSlot("circle").display
        ),
        this.createText("Touch to drag circle to modify IK bones.");
    }),
    (e.prototype._enterFrameHandler = function (t) {
      this._updateAim(), this._updateFoot();
    }),
    (e.prototype._updateAim = function () {
      var t = this._floorBoard.x,
        e = this._floorBoard.y,
        a = this._chestBone.global.y * this._floorBoard.scaleY;
      (this._faceDir = this._target.x > 0 ? 1 : -1),
        (this._armatureDisplay.armature.flipX = this._faceDir < 0),
        this._faceDir > 0
          ? (this._aimRadian = Math.atan2(
              this._target.y - e - a,
              this._target.x - t
            ))
          : ((this._aimRadian =
              Math.PI - Math.atan2(this._target.y - e - a, this._target.x - t)),
            this._aimRadian > Math.PI && (this._aimRadian -= 2 * Math.PI));
      var s = Math.abs((this._aimRadian + Math.PI / 2) / Math.PI);
      this._aimState.currentTime = s * this._aimState.totalTime;
    }),
    (e.prototype._updateFoot = function () {
      var t = -25 * dragonBones.Transform.DEG_RAD,
        e = 25 * dragonBones.Transform.DEG_RAD,
        a = Math.atan2(this._circleBone.global.y, this._circleBone.global.x);
      this._circleBone.global.x < 0 &&
        (a = dragonBones.Transform.normalizeRadian(a + Math.PI)),
        (this._offsetRotation = Math.min(Math.max(a, t), e)),
        (this._floorBoardBone.offset.rotation = this._offsetRotation),
        this._floorBoardBone.invalidUpdate();
      var s = Math.tan(this._offsetRotation),
        i = 1 / Math.sin(0.5 * Math.PI - this._offsetRotation) - 1;
      (this._leftFootBone.offset.y =
        s * this._leftFootBone.global.x + this._leftFootBone.origin.y * i),
        (this._leftFootBone.offset.rotation =
          this._offsetRotation * this._faceDir),
        this._leftFootBone.invalidUpdate(),
        (this._rightFootBone.offset.y =
          s * this._rightFootBone.global.x + this._rightFootBone.origin.y * i),
        (this._rightFootBone.offset.rotation =
          this._offsetRotation * this._faceDir),
        this._rightFootBone.invalidUpdate();
    }),
    e
  );
})(BaseDemo);
__reflect(InverseKinematics.prototype, "InverseKinematics");
var PerformanceTest = (function (t) {
  function e() {
    var e = t.call(this) || this;
    return (
      (e._addingArmature = !1),
      (e._removingArmature = !1),
      (e._armatures = []),
      e._resources.push(
        "resource/mecha_1406/mecha_1406_ske.dbbin",
        "resource/mecha_1406/mecha_1406_tex.json",
        "resource/mecha_1406/mecha_1406_tex.png"
      ),
      e
    );
  }
  return (
    __extends(e, t),
    (e.prototype._onStart = function () {
      this.stage.addEventListener(
        egret.Event.ENTER_FRAME,
        this._enterFrameHandler,
        this
      ),
        this.stage.addEventListener(
          egret.TouchEvent.TOUCH_BEGIN,
          this._touchHandler,
          this
        ),
        this.stage.addEventListener(
          egret.TouchEvent.TOUCH_END,
          this._touchHandler,
          this
        ),
        (this._text = this.createText(""));
      for (var t = 0; 300 > t; ++t) this._addArmature();
      this._resetPosition(), this._updateText();
    }),
    (e.prototype._enterFrameHandler = function (t) {
      if (this._addingArmature) {
        for (var e = 0; 10 > e; ++e) this._addArmature();
        this._resetPosition(), this._updateText();
      }
      if (this._removingArmature) {
        for (var e = 0; 10 > e; ++e) this._removeArmature();
        this._resetPosition(), this._updateText();
      }
    }),
    (e.prototype._touchHandler = function (t) {
      switch (t.type) {
        case egret.TouchEvent.TOUCH_BEGIN:
          var e = t.stageX > 0.5 * this.stageWidth;
          (this._addingArmature = e), (this._removingArmature = !e);
          break;
        case egret.TouchEvent.TOUCH_END:
          (this._addingArmature = !1), (this._removingArmature = !1);
      }
    }),
    (e.prototype._addArmature = function () {
      var t = dragonBones.EgretFactory.factory;
      0 === this._armatures.length &&
        (t.parseDragonBonesData(
          RES.getRes("resource/mecha_1406/mecha_1406_ske.dbbin")
        ),
        t.parseTextureAtlasData(
          RES.getRes("resource/mecha_1406/mecha_1406_tex.json"),
          RES.getRes("resource/mecha_1406/mecha_1406_tex.png")
        ));
      var e = t.buildArmatureDisplay("mecha_1406");
      (e.armature.cacheFrameRate = 24),
        e.animation.play("walk"),
        (e.scaleX = e.scaleY = 0.5),
        this.addChild(e),
        this._armatures.push(e);
    }),
    (e.prototype._removeArmature = function () {
      if (0 !== this._armatures.length) {
        var t = this._armatures.pop();
        this.removeChild(t),
          t.dispose(),
          0 === this._armatures.length &&
            (dragonBones.EgretFactory.factory.clear(!0),
            dragonBones.BaseObject.clearPool());
      }
    }),
    (e.prototype._resetPosition = function () {
      var t = this._armatures.length;
      if (0 !== t)
        for (
          var e = 100,
            a = 200,
            s = 100,
            i = 90,
            r = this.stageWidth - 2 * e,
            n = Math.floor(r / i),
            o = 0.5 * (this.stageWidth - n * i),
            _ = r / n,
            h = (this.stageHeight - a - s) / Math.ceil(t / n),
            l = 0,
            c = t;
          c > l;
          ++l
        ) {
          var p = this._armatures[l],
            u = Math.floor(l / n);
          (p.x = (l % n) * _ + o - 0.5 * this.stageWidth),
            (p.y = u * h + a - 0.5 * this.stageHeight);
        }
    }),
    (e.prototype._updateText = function () {
      (this._text.text =
        "Count: " +
        this._armatures.length +
        ". Touch screen left to decrease count / right to increase count."),
        (this._text.width = this.stageWidth),
        (this._text.x = 0.5 * -this.stageWidth),
        (this._text.y = 0.5 * this.stageHeight - 100),
        this.addChild(this._text);
    }),
    e
  );
})(BaseDemo);
__reflect(PerformanceTest.prototype, "PerformanceTest");
var ReplaceAnimation = (function (t) {
  function e() {
    var e = t.call(this) || this;
    return (
      e._resources.push(
        "resource/mecha_2903/mecha_2903_ske.json",
        "resource/mecha_2903/mecha_2903_tex.json",
        "resource/mecha_2903/mecha_2903_tex.png"
      ),
      e
    );
  }
  return (
    __extends(e, t),
    (e.prototype._onStart = function () {
      var t = this,
        e = dragonBones.EgretFactory.factory;
      e.parseDragonBonesData(
        RES.getRes("resource/mecha_2903/mecha_2903_ske.json")
      ),
        e.parseTextureAtlasData(
          RES.getRes("resource/mecha_2903/mecha_2903_tex.json"),
          RES.getRes("resource/mecha_2903/mecha_2903_tex.png")
        ),
        (this._armatureDisplayA = e.buildArmatureDisplay("mecha_2903")),
        (this._armatureDisplayB = e.buildArmatureDisplay("mecha_2903b")),
        (this._armatureDisplayC = e.buildArmatureDisplay("mecha_2903c")),
        (this._armatureDisplayD = e.buildArmatureDisplay("mecha_2903d"));
      var a = e.getArmatureData("mecha_2903d");
      e.replaceAnimation(this._armatureDisplayA.armature, a),
        e.replaceAnimation(this._armatureDisplayB.armature, a),
        e.replaceAnimation(this._armatureDisplayC.armature, a),
        this.addChild(this._armatureDisplayD),
        this.addChild(this._armatureDisplayA),
        this.addChild(this._armatureDisplayB),
        this.addChild(this._armatureDisplayC),
        (this._armatureDisplayA.x = -350),
        (this._armatureDisplayA.y = 150),
        (this._armatureDisplayB.x = 0),
        (this._armatureDisplayB.y = 150),
        (this._armatureDisplayC.x = 350),
        (this._armatureDisplayC.y = 150),
        (this._armatureDisplayD.x = 0),
        (this._armatureDisplayD.y = -50),
        this.stage.addEventListener(
          egret.TouchEvent.TOUCH_END,
          function () {
            t._changeAnimation();
          },
          this
        ),
        this.createText("Touch to change animation.");
    }),
    (e.prototype._changeAnimation = function () {
      var t = this._armatureDisplayD.animation.lastAnimationName;
      if (t) {
        var e = this._armatureDisplayD.animation.animationNames,
          a = (e.indexOf(t) + 1) % e.length;
        this._armatureDisplayD.animation.play(e[a]);
      } else this._armatureDisplayD.animation.play();
      (t = this._armatureDisplayD.animation.lastAnimationName),
        this._armatureDisplayA.animation.play(t),
        this._armatureDisplayB.animation.play(t),
        this._armatureDisplayC.animation.play(t);
    }),
    e
  );
})(BaseDemo);
__reflect(ReplaceAnimation.prototype, "ReplaceAnimation");
var ReplaceSkin = (function (t) {
  function e() {
    var e = t.call(this) || this;
    (e._replaceSuitIndex = 0),
      (e._factory = dragonBones.EgretFactory.factory),
      (e._suitConfigs = []),
      (e._replaceSuitParts = []),
      e._suitConfigs.push([
        "2010600a",
        "2010600a_1",
        "20208003",
        "20208003_1",
        "20208003_2",
        "20208003_3",
        "20405006",
        "20509005",
        "20703016",
        "20703016_1",
        "2080100c",
        "2080100e",
        "2080100e_1",
        "20803005",
        "2080500b",
        "2080500b_1",
      ]),
      e._suitConfigs.push([
        "20106010",
        "20106010_1",
        "20208006",
        "20208006_1",
        "20208006_2",
        "20208006_3",
        "2040600b",
        "2040600b_1",
        "20509007",
        "20703020",
        "20703020_1",
        "2080b003",
        "20801015",
      ]),
      e._resources.push(
        "resource/you_xin/body/body_ske.json",
        "resource/you_xin/body/body_tex.json",
        "resource/you_xin/body/body_tex.png"
      );
    for (var a = 0, s = e._suitConfigs.length; s > a; ++a)
      for (var i = 0, r = e._suitConfigs[a]; i < r.length; i++) {
        var n = r[i],
          o = "resource/you_xin/suit" + (a + 1) + "/" + n + "/" + n,
          _ = o + "_ske.json",
          h = o + "_tex.json",
          l = o + "_tex.png";
        e._resources.push(_, h, l);
      }
    return e;
  }
  return (
    __extends(e, t),
    (e.prototype._onStart = function () {
      var t = this;
      this._factory.parseDragonBonesData(
        RES.getRes("resource/you_xin/body/body_ske.json")
      ),
        this._factory.parseTextureAtlasData(
          RES.getRes("resource/you_xin/body/body_tex.json"),
          RES.getRes("resource/you_xin/body/body_tex.png")
        );
      for (var e = 0, a = this._suitConfigs.length; a > e; ++e)
        for (var s = 0, i = this._suitConfigs[e]; s < i.length; s++) {
          var r = i[s],
            n = "resource/you_xin/suit" + (e + 1) + "/" + r + "/" + r,
            o = n + "_ske.json",
            _ = n + "_tex.json",
            h = n + "_tex.png";
          this._factory.parseDragonBonesData(RES.getRes(o)),
            this._factory.parseTextureAtlasData(RES.getRes(_), RES.getRes(h));
        }
      (this._armatureDisplay = this._factory.buildArmatureDisplay("body")),
        this._armatureDisplay.addEventListener(
          dragonBones.EventObject.LOOP_COMPLETE,
          this._animationEventHandler,
          this
        ),
        this._armatureDisplay.animation.play("idle", 0),
        (this._armatureDisplay.x = 0),
        (this._armatureDisplay.y = 200),
        (this._armatureDisplay.scaleX = this._armatureDisplay.scaleY = 0.25),
        this.addChild(this._armatureDisplay);
      for (var l = 0, c = this._suitConfigs[0]; l < c.length; l++) {
        var p = c[l],
          u = this._factory.getArmatureData(p);
        this._factory.replaceSkin(
          this._armatureDisplay.armature,
          u.defaultSkin
        );
      }
      this.stage.addEventListener(
        egret.TouchEvent.TOUCH_BEGIN,
        function () {
          t._randomReplaceSkin();
        },
        this
      ),
        this.createText("Touch to replace armature skin.");
    }),
    (e.prototype._animationEventHandler = function (t) {
      var e = Math.floor(
          Math.random() * this._armatureDisplay.animation.animationNames.length
        ),
        a = this._armatureDisplay.animation.animationNames[e];
      this._armatureDisplay.animation.fadeIn(a, 0.3, 0);
    }),
    (e.prototype._randomReplaceSkin = function () {
      if (0 === this._replaceSuitParts.length) {
        this._replaceSuitIndex++,
          this._replaceSuitIndex >= this._suitConfigs.length &&
            (this._replaceSuitIndex = 0);
        for (
          var t = 0, e = this._suitConfigs[this._replaceSuitIndex];
          t < e.length;
          t++
        ) {
          var a = e[t];
          this._replaceSuitParts.push(a);
        }
      }
      var s = Math.floor(Math.random() * this._replaceSuitParts.length),
        i = this._replaceSuitParts[s],
        r = this._factory.getArmatureData(i);
      this._factory.replaceSkin(this._armatureDisplay.armature, r.defaultSkin),
        this._replaceSuitParts.splice(s, 1);
    }),
    e
  );
})(BaseDemo);
__reflect(ReplaceSkin.prototype, "ReplaceSkin");
var coreElement;
!(function (t) {
  var e = (function (t) {
    function e() {
      var e = t.call(this) || this;
      return (
        (e._left = !1),
        (e._right = !1),
        (e._bullets = []),
        e._resources.push(
          "resource/mecha_1502b/mecha_1502b_ske.json",
          "resource/mecha_1502b/mecha_1502b_tex.json",
          "resource/mecha_1502b/mecha_1502b_tex.png",
          "resource/skin_1502b/skin_1502b_ske.json",
          "resource/skin_1502b/skin_1502b_tex.json",
          "resource/skin_1502b/skin_1502b_tex.png",
          "resource/weapon_1000/weapon_1000_ske.json",
          "resource/weapon_1000/weapon_1000_tex.json",
          "resource/weapon_1000/weapon_1000_tex.png"
        ),
        e
      );
    }
    return (
      __extends(e, t),
      (e.prototype._onStart = function () {
        (e.GROUND = 0.5 * this.stageHeight - 150),
          (e.instance = this),
          this.stage.addEventListener(
            egret.Event.ENTER_FRAME,
            this._enterFrameHandler,
            this
          ),
          this.stage.addEventListener(
            egret.TouchEvent.TOUCH_BEGIN,
            this._touchHandler,
            this
          ),
          this.stage.addEventListener(
            egret.TouchEvent.TOUCH_END,
            this._touchHandler,
            this
          ),
          document.addEventListener("keydown", this._keyHandler),
          document.addEventListener("keyup", this._keyHandler);
        var t = egret.sys.TouchHandler.prototype.onTouchMove;
        (egret.sys.TouchHandler.prototype.onTouchMove = function (a, s, i) {
          t.call(this, a, s, i),
            e.instance._player.aim(a - e.instance.x, s - e.instance.y);
        }),
          this.createText(
            "Press W/A/S/D to move. Press Q/E/SPACE to switch weapons and skin. Touch to aim and fire."
          );
        var s = dragonBones.EgretFactory.factory;
        s.parseDragonBonesData(
          RES.getRes("resource/mecha_1502b/mecha_1502b_ske.json")
        ),
          s.parseTextureAtlasData(
            RES.getRes("resource/mecha_1502b/mecha_1502b_tex.json"),
            RES.getRes("resource/mecha_1502b/mecha_1502b_tex.png")
          ),
          s.parseDragonBonesData(
            RES.getRes("resource/skin_1502b/skin_1502b_ske.json")
          ),
          s.parseTextureAtlasData(
            RES.getRes("resource/skin_1502b/skin_1502b_tex.json"),
            RES.getRes("resource/skin_1502b/skin_1502b_tex.png")
          ),
          s.parseDragonBonesData(
            RES.getRes("resource/weapon_1000/weapon_1000_ske.json")
          ),
          s.parseTextureAtlasData(
            RES.getRes("resource/weapon_1000/weapon_1000_tex.json"),
            RES.getRes("resource/weapon_1000/weapon_1000_tex.png")
          ),
          (this._player = new a());
      }),
      (e.prototype._touchHandler = function (t) {
        this._player.aim(t.stageX - this.x, t.stageY - this.y),
          t.type === egret.TouchEvent.TOUCH_BEGIN
            ? this._player.attack(!0)
            : this._player.attack(!1);
      }),
      (e.prototype._keyHandler = function (t) {
        var a = "keydown" === t.type;
        switch (t.keyCode) {
          case 37:
          case 65:
            (e.instance._left = a), e.instance._updateMove(-1);
            break;
          case 39:
          case 68:
            (e.instance._right = a), e.instance._updateMove(1);
            break;
          case 38:
          case 87:
            a && e.instance._player.jump();
            break;
          case 83:
          case 40:
            e.instance._player.squat(a);
            break;
          case 81:
            a && e.instance._player.switchWeaponR();
            break;
          case 69:
            a && e.instance._player.switchWeaponL();
            break;
          case 32:
            a && e.instance._player.switchSkin();
        }
      }),
      (e.prototype._enterFrameHandler = function (t) {
        this._player && this._player.update();
        for (var e = this._bullets.length; e--; ) {
          var a = this._bullets[e];
          a.update() && this._bullets.splice(e, 1);
        }
      }),
      (e.prototype._updateMove = function (t) {
        this._left && this._right
          ? this._player.move(t)
          : this._left
          ? this._player.move(-1)
          : this._right
          ? this._player.move(1)
          : this._player.move(0);
      }),
      (e.prototype.addBullet = function (t) {
        this._bullets.push(t);
      }),
      (e.G = 0.6),
      e
    );
  })(BaseDemo);
  (t.Game = e), __reflect(e.prototype, "coreElement.Game");
  var a = (function () {
    function t() {
      (this._isJumpingA = !1),
        (this._isSquating = !1),
        (this._isAttackingA = !1),
        (this._isAttackingB = !1),
        (this._weaponRIndex = 0),
        (this._weaponLIndex = 0),
        (this._skinIndex = 0),
        (this._faceDir = 1),
        (this._aimDir = 0),
        (this._moveDir = 0),
        (this._aimRadian = 0),
        (this._speedX = 0),
        (this._speedY = 0),
        (this._aimState = null),
        (this._walkState = null),
        (this._attackState = null),
        (this._target = new egret.Point()),
        (this._helpPoint = new egret.Point()),
        (this._armatureDisplay = dragonBones.EgretFactory.factory.buildArmatureDisplay(
          "mecha_1502b"
        )),
        (this._armatureDisplay.x = 0),
        (this._armatureDisplay.y = e.GROUND),
        this._armatureDisplay.addEventListener(
          dragonBones.EventObject.FADE_IN_COMPLETE,
          this._animationEventHandler,
          this
        ),
        this._armatureDisplay.addEventListener(
          dragonBones.EventObject.FADE_OUT_COMPLETE,
          this._animationEventHandler,
          this
        ),
        this._armatureDisplay.addEventListener(
          dragonBones.EventObject.COMPLETE,
          this._animationEventHandler,
          this
        ),
        (this._armature = this._armatureDisplay.armature),
        (this._weaponL = this._armature.getSlot("weapon_l").childArmature),
        (this._weaponR = this._armature.getSlot("weapon_r").childArmature),
        this._weaponL.eventDispatcher.addDBEventListener(
          dragonBones.EventObject.FRAME_EVENT,
          this._frameEventHandler,
          this
        ),
        this._weaponR.eventDispatcher.addDBEventListener(
          dragonBones.EventObject.FRAME_EVENT,
          this._frameEventHandler,
          this
        ),
        e.instance.addChild(this._armatureDisplay),
        this._updateAnimation();
    }
    return (
      (t.prototype.move = function (t) {
        this._moveDir !== t && ((this._moveDir = t), this._updateAnimation());
      }),
      (t.prototype.jump = function () {
        this._isJumpingA ||
          ((this._isJumpingA = !0),
          (this._armature.animation.fadeIn(
            "jump_1",
            -1,
            -1,
            0,
            t.NORMAL_ANIMATION_GROUP
          ).resetToPose = !1),
          (this._walkState = null));
      }),
      (t.prototype.squat = function (t) {
        this._isSquating !== t &&
          ((this._isSquating = t), this._updateAnimation());
      }),
      (t.prototype.attack = function (t) {
        this._isAttackingA !== t && (this._isAttackingA = t);
      }),
      (t.prototype.switchWeaponL = function () {
        this._weaponL.eventDispatcher.removeDBEventListener(
          dragonBones.EventObject.FRAME_EVENT,
          this._frameEventHandler,
          this
        ),
          this._weaponLIndex++,
          (this._weaponLIndex %= t.WEAPON_L_LIST.length);
        var e = t.WEAPON_L_LIST[this._weaponLIndex];
        (this._weaponL = dragonBones.EgretFactory.factory.buildArmature(e)),
          (this._armature.getSlot("weapon_l").childArmature = this._weaponL),
          this._weaponL.eventDispatcher.addDBEventListener(
            dragonBones.EventObject.FRAME_EVENT,
            this._frameEventHandler,
            this
          );
      }),
      (t.prototype.switchWeaponR = function () {
        this._weaponR.eventDispatcher.removeDBEventListener(
          dragonBones.EventObject.FRAME_EVENT,
          this._frameEventHandler,
          this
        ),
          this._weaponRIndex++,
          (this._weaponRIndex %= t.WEAPON_R_LIST.length);
        var e = t.WEAPON_R_LIST[this._weaponRIndex];
        (this._weaponR = dragonBones.EgretFactory.factory.buildArmature(e)),
          (this._armature.getSlot("weapon_r").childArmature = this._weaponR),
          this._weaponR.eventDispatcher.addDBEventListener(
            dragonBones.EventObject.FRAME_EVENT,
            this._frameEventHandler,
            this
          );
      }),
      (t.prototype.switchSkin = function () {
        this._skinIndex++, (this._skinIndex %= t.SKINS.length);
        var e = t.SKINS[this._skinIndex],
          a = dragonBones.EgretFactory.factory.getArmatureData(e).defaultSkin;
        dragonBones.EgretFactory.factory.replaceSkin(this._armature, a, !1, [
          "weapon_l",
          "weapon_r",
        ]);
      }),
      (t.prototype.aim = function (t, e) {
        (this._target.x = t), (this._target.y = e);
      }),
      (t.prototype.update = function () {
        this._updatePosition(), this._updateAim(), this._updateAttack();
      }),
      (t.prototype._animationEventHandler = function (e) {
        switch (e.type) {
          case dragonBones.EventObject.FADE_IN_COMPLETE:
            "jump_1" === e.eventObject.animationState.name &&
              ((this._speedY = -t.JUMP_SPEED),
              0 !== this._moveDir &&
                (this._moveDir * this._faceDir > 0
                  ? (this._speedX = t.MAX_MOVE_SPEED_FRONT * this._faceDir)
                  : (this._speedX = -t.MAX_MOVE_SPEED_BACK * this._faceDir)),
              (this._armature.animation.fadeIn(
                "jump_2",
                -1,
                -1,
                0,
                t.NORMAL_ANIMATION_GROUP
              ).resetToPose = !1));
            break;
          case dragonBones.EventObject.FADE_OUT_COMPLETE:
            "attack_01" === e.eventObject.animationState.name &&
              ((this._isAttackingB = !1), (this._attackState = null));
            break;
          case dragonBones.EventObject.COMPLETE:
            "jump_4" === e.eventObject.animationState.name &&
              ((this._isJumpingA = !1), this._updateAnimation());
        }
      }),
      (t.prototype._frameEventHandler = function (t) {
        "fire" === t.eventObject.name &&
          (t.eventObject.armature.display.localToGlobal(
            t.eventObject.bone.global.x,
            t.eventObject.bone.global.y,
            this._helpPoint
          ),
          e.instance.globalToLocal(
            this._helpPoint.x,
            this._helpPoint.y,
            this._helpPoint
          ),
          this._fire(this._helpPoint));
      }),
      (t.prototype._fire = function (t) {
        var a = this._faceDir < 0 ? Math.PI - this._aimRadian : this._aimRadian,
          i = new s(
            "bullet_01",
            "fire_effect_01",
            a + 0.02 * Math.random() - 0.01,
            40,
            t
          );
        e.instance.addBullet(i);
      }),
      (t.prototype._updateAnimation = function () {
        return this._isJumpingA
          ? void 0
          : this._isSquating
          ? ((this._speedX = 0),
            (this._armature.animation.fadeIn(
              "squat",
              -1,
              -1,
              0,
              t.NORMAL_ANIMATION_GROUP
            ).resetToPose = !1),
            void (this._walkState = null))
          : void (0 === this._moveDir
              ? ((this._speedX = 0),
                (this._armature.animation.fadeIn(
                  "idle",
                  -1,
                  -1,
                  0,
                  t.NORMAL_ANIMATION_GROUP
                ).resetToPose = !1),
                (this._walkState = null))
              : (null === this._walkState &&
                  ((this._walkState = this._armature.animation.fadeIn(
                    "walk",
                    -1,
                    -1,
                    0,
                    t.NORMAL_ANIMATION_GROUP
                  )),
                  (this._walkState.resetToPose = !1)),
                this._moveDir * this._faceDir > 0
                  ? (this._walkState.timeScale =
                      t.MAX_MOVE_SPEED_FRONT / t.NORMALIZE_MOVE_SPEED)
                  : (this._walkState.timeScale =
                      -t.MAX_MOVE_SPEED_BACK / t.NORMALIZE_MOVE_SPEED),
                this._moveDir * this._faceDir > 0
                  ? (this._speedX = t.MAX_MOVE_SPEED_FRONT * this._faceDir)
                  : (this._speedX = -t.MAX_MOVE_SPEED_BACK * this._faceDir)));
      }),
      (t.prototype._updatePosition = function () {
        0 !== this._speedX &&
          ((this._armatureDisplay.x += this._speedX),
          this._armatureDisplay.x < 0.5 * -e.instance.stageWidth
            ? (this._armatureDisplay.x = 0.5 * -e.instance.stageWidth)
            : this._armatureDisplay.x > 0.5 * e.instance.stageWidth &&
              (this._armatureDisplay.x = 0.5 * e.instance.stageWidth)),
          0 !== this._speedY &&
            (this._speedY < 5 &&
              this._speedY + e.G >= 5 &&
              (this._armature.animation.fadeIn(
                "jump_3",
                -1,
                -1,
                0,
                t.NORMAL_ANIMATION_GROUP
              ).resetToPose = !1),
            (this._speedY += e.G),
            (this._armatureDisplay.y += this._speedY),
            this._armatureDisplay.y > e.GROUND &&
              ((this._armatureDisplay.y = e.GROUND),
              (this._speedY = 0),
              (this._armature.animation.fadeIn(
                "jump_4",
                -1,
                -1,
                0,
                t.NORMAL_ANIMATION_GROUP
              ).resetToPose = !1)));
      }),
      (t.prototype._updateAim = function () {
        (this._faceDir = this._target.x > this._armatureDisplay.x ? 1 : -1),
          this._armatureDisplay.armature.flipX !== this._faceDir < 0 &&
            ((this._armatureDisplay.armature.flipX = !this._armatureDisplay
              .armature.flipX),
            0 !== this._moveDir && this._updateAnimation());
        var e =
          this._armature.getBone("chest").global.y *
          this._armatureDisplay.scaleY;
        this._faceDir > 0
          ? (this._aimRadian = Math.atan2(
              this._target.y - this._armatureDisplay.y - e,
              this._target.x - this._armatureDisplay.x
            ))
          : ((this._aimRadian =
              Math.PI -
              Math.atan2(
                this._target.y - this._armatureDisplay.y - e,
                this._target.x - this._armatureDisplay.x
              )),
            this._aimRadian > Math.PI && (this._aimRadian -= 2 * Math.PI));
        var a = 0;
        (a = this._aimRadian > 0 ? -1 : 1),
          (null === this._aimState || this._aimDir !== a) &&
            ((this._aimDir = a),
            this._aimDir >= 0
              ? (this._aimState = this._armature.animation.fadeIn(
                  "aim_up",
                  -1,
                  -1,
                  0,
                  t.AIM_ANIMATION_GROUP
                ))
              : (this._aimState = this._armature.animation.fadeIn(
                  "aim_down",
                  -1,
                  -1,
                  0,
                  t.AIM_ANIMATION_GROUP
                )),
            (this._aimState.resetToPose = !1)),
          (this._aimState.weight = Math.abs((this._aimRadian / Math.PI) * 2)),
          this._armature.invalidUpdate();
      }),
      (t.prototype._updateAttack = function () {
        this._isAttackingA &&
          !this._isAttackingB &&
          ((this._isAttackingB = !0),
          (this._attackState = this._armature.animation.fadeIn(
            "attack_01",
            -1,
            -1,
            0,
            t.ATTACK_ANIMATION_GROUP
          )),
          (this._attackState.resetToPose = !1),
          (this._attackState.autoFadeOutTime = 0.1));
      }),
      (t.JUMP_SPEED = 20),
      (t.NORMALIZE_MOVE_SPEED = 3.6),
      (t.MAX_MOVE_SPEED_FRONT = 1.4 * t.NORMALIZE_MOVE_SPEED),
      (t.MAX_MOVE_SPEED_BACK = 1 * t.NORMALIZE_MOVE_SPEED),
      (t.NORMAL_ANIMATION_GROUP = "normal"),
      (t.AIM_ANIMATION_GROUP = "aim"),
      (t.ATTACK_ANIMATION_GROUP = "attack"),
      (t.WEAPON_L_LIST = [
        "weapon_1502b_l",
        "weapon_1005",
        "weapon_1005b",
        "weapon_1005c",
        "weapon_1005d",
        "weapon_1005e",
      ]),
      (t.WEAPON_R_LIST = [
        "weapon_1502b_r",
        "weapon_1005",
        "weapon_1005b",
        "weapon_1005c",
        "weapon_1005d",
      ]),
      (t.SKINS = ["mecha_1502b", "skin_a", "skin_b", "skin_c"]),
      t
    );
  })();
  __reflect(a.prototype, "Mecha");
  var s = (function () {
    function t(t, a, s, i, r) {
      (this._speedX = 0),
        (this._speedY = 0),
        (this._effecDisplay = null),
        (this._speedX = Math.cos(s) * i),
        (this._speedY = Math.sin(s) * i),
        (this._armatureDisplay = dragonBones.EgretFactory.factory.buildArmatureDisplay(
          t
        )),
        (this._armatureDisplay.x = r.x + 2 * Math.random() - 1),
        (this._armatureDisplay.y = r.y + 2 * Math.random() - 1),
        (this._armatureDisplay.rotation = (180 * s) / Math.PI),
        null !== a &&
          ((this._effecDisplay = dragonBones.EgretFactory.factory.buildArmatureDisplay(
            a
          )),
          (this._effecDisplay.rotation = (180 * s) / Math.PI),
          (this._effecDisplay.x = this._armatureDisplay.x),
          (this._effecDisplay.y = this._armatureDisplay.y),
          (this._effecDisplay.scaleX = 1 + 1 * Math.random()),
          (this._effecDisplay.scaleY = 1 + 0.5 * Math.random()),
          Math.random() < 0.5 && (this._effecDisplay.scaleY *= -1),
          e.instance.addChild(this._effecDisplay),
          this._effecDisplay.animation.play("idle")),
        e.instance.addChild(this._armatureDisplay),
        this._armatureDisplay.animation.play("idle");
    }
    return (
      (t.prototype.update = function () {
        return (
          (this._armatureDisplay.x += this._speedX),
          (this._armatureDisplay.y += this._speedY),
          this._armatureDisplay.x < 0.5 * -e.instance.stageWidth - 100 ||
          this._armatureDisplay.x > 0.5 * e.instance.stageWidth + 100 ||
          this._armatureDisplay.y < 0.5 * -e.instance.stageHeight - 100 ||
          this._armatureDisplay.y > 0.5 * e.instance.stageHeight + 100
            ? (e.instance.removeChild(this._armatureDisplay),
              this._armatureDisplay.dispose(),
              null !== this._effecDisplay &&
                (e.instance.removeChild(this._effecDisplay),
                this._effecDisplay.dispose()),
              !0)
            : !1
        );
      }),
      t
    );
  })();
  __reflect(s.prototype, "Bullet");
})(coreElement || (coreElement = {}));