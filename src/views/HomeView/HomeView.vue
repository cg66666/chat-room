<!--
 * @Description: file content
 * @Author: cg
 * @Date: 2024-08-16 11:35:37
 * @LastEditors: cg
 * @LastEditTime: 2024-10-21 23:37:07
-->
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { get, post } from '@/ajax'
import { useRouter } from 'vue-router'
import { ModeEnum, useLoginStore } from '@/stores'
import { type FormInstance, type FormRules } from 'element-plus'

enum OperateEnum {
  CREATE,
  JOIN
}

// 登录相关
const loginStore = useLoginStore()

const router = useRouter()

// 弹出框表格实体
const formRef = ref<FormInstance>()

const formData = reactive({
  room: '',
  user: '',
  password: ''
})

// 创建表格校验
const rules = reactive<FormRules<typeof formData>>({
  room: [{ required: true, message: '请填写房间名！', trigger: 'blur' }],
  user: [{ required: true, message: '请填写用户名！', trigger: 'blur' }]
})

// 动画一
const isInit1 = ref(false)
// 动画二
const isInit2 = ref(false)

// 弹出框模式
const dialogMode = ref<OperateEnum>(OperateEnum.CREATE)

// 创建弹出框显隐
const dialogVisible = ref(false)

// 开启匿名
const openAnoumity = (e: MouseEvent) => {
  if (loginStore.mode === ModeEnum.LOGGED) {
    return ElMessage({
      message: '请先退出登录！',
      type: 'warning',
      plain: true
    })
  }
  if (document.startViewTransition) {
    const transition = document.startViewTransition(() => {
      document.documentElement.classList.toggle('dark')
      loginStore.mode =
        loginStore.mode === ModeEnum.ANONYMITY ? ModeEnum.NOTLOGING : ModeEnum.ANONYMITY
    })
    // 在 transition.ready 的 Promise 完成后，执行自定义动画
    transition.ready.then(() => {
      // 由于我们要从鼠标点击的位置开始做动画，所以我们需要先获取到鼠标的位置
      const { clientX, clientY } = e

      // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
      const radius = Math.hypot(
        Math.max(clientX, innerWidth - clientX),
        Math.max(clientY, innerHeight - clientY)
      )
      const clipPath = [
        `circle(0% at ${clientX}px ${clientY}px)`,
        `circle(${radius}px at ${clientX}px ${clientY}px)`
      ]
      const isDark = document.documentElement.classList.contains('dark')
      // 自定义动画
      document.documentElement.animate(
        {
          // 如果要切换到暗色主题，我们在过渡的时候从半径 100% 的圆开始，到 0% 的圆结束
          clipPath: isDark ? clipPath.reverse() : clipPath
        },
        {
          duration: 500,
          // 如果要切换到暗色主题，我们应该裁剪 view-transition-old(root) 的内容
          pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)'
        }
      )
    })
  } else {
    document.documentElement.classList.toggle('dark')
    loginStore.mode =
      loginStore.mode === ModeEnum.ANONYMITY ? ModeEnum.NOTLOGING : ModeEnum.ANONYMITY
  }
}

// 去创建房间
const toCreate = () => {
  if (loginStore.mode === ModeEnum.NOTLOGING) {
    return ElMessage({
      message: '请先登录或开启匿名！',
      type: 'warning',
      plain: true
    })
  }

  if (formRef.value) formRef.value.resetFields()
  formData.user = loginStore.userName
  dialogVisible.value = true
  dialogMode.value = OperateEnum.CREATE
}

// 去登陆
const toLogin = () => {
  if (loginStore.mode === ModeEnum.ANONYMITY) {
    return ElMessage({
      message: '请先关闭匿名模式！',
      type: 'warning',
      plain: true
    })
  } else {
    loginStore.toLogin()
  }
}

// 去加入房间
const toJoin = () => {
  if (loginStore.mode === ModeEnum.NOTLOGING)
    return ElMessage({
      message: '请先登录或开启匿名！',
      type: 'warning',
      plain: true
    })
  if (formRef.value) formRef.value.resetFields()
  formData.user = loginStore.userName
  dialogVisible.value = true
  dialogMode.value = OperateEnum.JOIN
}

// 创建房间
const createRoom = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid, fields) => {
    if (valid) {
      const res = await post('/chat_room/create', formData)
      if (res.successful) {
        const { room, user, password } = formData
        loginStore.userName = user
        loginStore.roomInfo = {
          room,
          password
        }
        formRef.value?.resetFields()
        dialogVisible.value = false
        router.push({
          name: 'room',
          query: {
            room,
            user,
            password,
            mode: loginStore.mode
          }
        })
      }
    }
  })
}

// 加入房间
const joinRoom = async () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid, fields) => {
    if (valid) {
      const res = await post('/chat_room/join', formData)
      if (res.successful) {
        const { room, user, password } = formData
        loginStore.userName = user
        loginStore.roomInfo = {
          room,
          password
        }
        formRef.value?.resetFields()
        dialogVisible.value = false
        router.push({
          name: 'room',
          query: {
            room,
            user,
            password,
            mode: loginStore.mode
          }
        })
      }
    }
  })
}

// 退出登录
const toLogOut = async () => {
  const res = await get('/chat_room/logout')
  if (res.successful) {
    // 清除cookie
    document.cookie = 'X-TOKEN' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    loginStore.mode = ModeEnum.NOTLOGING
    loginStore.userName = ''
    loginStore.roomInfo = undefined
    ElMessage({
      message: '退出登录成功！',
      type: 'warning',
      plain: true
    })
  }
}

onMounted(() => {
  // 两个动画执行延迟
  setTimeout(() => {
    isInit1.value = true
  }, 450)
  setTimeout(() => {
    isInit2.value = true
  }, 1000)
})
</script>

<template>
  <div>
    <div class="homeContainer">
      <div class="container">
        <div class="leftTop box">
          <div :class="`boxContainer leftTopBox ${isInit2 ? 'showBox' : ''}`" @click="toCreate">
            <ChatIcon name="icon-create" size="30px" class="icon"></ChatIcon>
            <div>创建房间</div>
          </div>
        </div>
        <div class="rightTop box">
          <div :class="`boxContainer rightTopBox ${isInit2 ? 'showBox' : ''}`" @click="toJoin">
            <ChatIcon name="icon-join" size="32px" class="icon"></ChatIcon>
            <div>加入房间</div>
          </div>
        </div>
        <div class="leftBottom box">
          <div
            :class="`boxContainer leftBottomBox ${isInit2 ? 'showBox' : ''}`"
            @click="() => (loginStore.mode === ModeEnum.LOGGED ? toLogOut() : toLogin())"
          >
            <ChatIcon
              :name="loginStore.mode === ModeEnum.NOTLOGING ? 'icon-login' : 'icon-logout'"
              size="30px"
              class="icon"
            ></ChatIcon>
            <div>
              {{
                [ModeEnum.NOTLOGING, ModeEnum.ANONYMITY].includes(loginStore.mode)
                  ? '登录'
                  : '退出登录'
              }}
            </div>
          </div>
        </div>
        <div class="rightBottom box">
          <div
            :class="`boxContainer rightBottomBox ${isInit2 ? 'showBox' : ''}`"
            @click="openAnoumity"
          >
            <ChatIcon name="icon-anonymity" size="32px" class="icon"></ChatIcon>
            <div>{{ loginStore.mode === ModeEnum.ANONYMITY ? '关闭' : '开启' }}匿名</div>
          </div>
        </div>
        <div :class="`firstLine line ${isInit1 ? 'widthLine' : ''}`"></div>
        <div :class="`twiceLine line ${isInit1 ? 'widthLine' : ''}`"></div>
        <div :class="`thirdLine line ${isInit1 ? 'widthLine' : ''}`"></div>
        <div :class="`forthLine line ${isInit1 ? 'widthLine' : ''}`"></div>
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      :title="dialogMode === OperateEnum.CREATE ? '创建房间' : '加入房间'"
      draggable
    >
      <el-form
        ref="formRef"
        style="max-width: 500px"
        :model="formData"
        :rules="rules"
        status-icon
        label-width="auto"
      >
        <el-form-item label="房间名" prop="room">
          <el-input v-model="formData.room" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户名" prop="user">
          <el-input
            v-model="formData.user"
            autocomplete="off"
            :disabled="loginStore.mode === ModeEnum.LOGGED"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" type="password" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            @click="
              () => {
                dialogVisible = false
                formRef?.resetFields()
              }
            "
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="() => (dialogMode === OperateEnum.CREATE ? createRoom() : joinRoom())"
          >
            {{ dialogMode === OperateEnum.CREATE ? '创建' : '加入' }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-dialog) {
  width: 90%;
  max-width: 550px;
}
:deep(input) {
  font-size: 16px;
  &:focus {
    font-size: 16px;
  }
}
.homeContainer {
  height: 100%;
  margin: 0 auto;
  max-width: 900px;
  display: flex;
  justify-content: center;
  .container {
    margin: 20% auto 0;
    position: relative;
    width: 180px;
    height: 180px;

    .line {
      width: 0px;
      height: 2px;
      background: var(--text-color);
      position: absolute;
      left: calc(50% - 2px);
      top: calc(50% - 2px);
      transform-origin: left;
      transition: width 0.5s;
    }

    .firstLine {
      rotate: -90deg;
    }

    .twiceLine {
      rotate: -180deg;
    }

    .thirdLine {
      rotate: -270deg;
    }

    .widthLine {
      width: 90px;
    }

    .box {
      width: 90px;
      height: 90px;
      position: absolute;
      overflow: hidden;
      font-size: 16px;
      font-weight: bold;
      .boxContainer {
        cursor: pointer;
        position: relative;
        width: 100%;
        height: 100%;
        transition: all 0.6s;
        opacity: 0;
        & > div {
          position: absolute;
          bottom: 13px;
          width: 100%;
          text-align: center;
        }
        .icon {
          position: absolute;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }

    .leftTop {
      left: 0;
      top: 0;
    }

    .leftTopBox {
      transform: translateX(40px);
    }

    .rightTop {
      right: 0;
      top: 0;
    }

    .rightTopBox {
      transform: translateY(40px);
    }

    .leftBottom {
      left: 0;
      bottom: 0;
    }

    .leftBottomBox {
      transform: translateY(-40px);
    }

    .rightBottom {
      right: 0;
      bottom: 0;
    }

    .rightBottomBox {
      transform: translateX(-40px);
    }

    .showBox {
      transform: translateX(0) translateY(0);
      opacity: 1 !important;
    }
  }
}
</style>
