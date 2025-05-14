<template>
  <div class="main-container">
    <a-steps :current="current" :items="items"></a-steps>
    <div class="steps-content">
      <!--动态切换组件-->
      <component ref="childRef" :is="steps[current].content" v-model="waitDeployImage"></component>
    </div>
    <div class="steps-action">
      <a-button v-if="current > 0" @click="prev">上一步</a-button>
      <a-button
          v-if="current == steps.length - 1"
          type="primary"
          :loading="submitLoading"
          style="margin-left: 8px"
          @click="completeJob"
      >
        发布
      </a-button>
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">下一步</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import {message, notification} from 'ant-design-vue';
import SelectImage from "./SelectImage.vue";
import DeployImage from "./DeployImage.vue";
import {updateContainer} from "../apis/api.ts";

const childRef = ref<InstanceType<typeof SelectImage> | null>(null);

const current = ref<number>(0);
const submitLoading = ref<boolean>(false);
// 待发布镜像
const waitDeployImage = ref<string>('');

const next = () => {
  // 校验表单是否合格
  childRef.value?.validateFrom().then(
      validResult => {
        if (validResult) {
          console.log("校验成功！！！！")
          childRef.value?.handleVersionChange()
          current.value++;
        }
      }
  );
};
const prev = () => {
  current.value--;
};
const steps = [
  {
    title: '选择镜像',
    content: SelectImage,
  },
  {
    title: '部署发布',
    content: DeployImage,
  }
];
const items = steps.map(item => ({key: item.title, title: item.title}));

const openNotify = (type: string, title: string, msg: string) => {
  // @ts-ignore
  notification[type]({
    message: title,
    description: msg,
  });
}

// 提交完整动作
const completeJob = async () => {
  submitLoading.value = true
  const imageDataSplit = waitDeployImage.value.split(':')
  updateContainer({
    repo_name: imageDataSplit[0],
    version: imageDataSplit[1]
  }).then(async res => {
    if (res.code === 200) {
      // 弹框完成
      message.success('部署完成，正在跳转至第一步！')
      // 回到第一步，重新开始
      current.value = 0;
      waitDeployImage.value = '';

    } else {
      // 弹框报错
      openNotify("error", '部署失败', res.msg)
    }
  }).finally(() => {
    submitLoading.value = false
  })
}

</script>

<style scoped>

.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  padding-top: 80px;
}

.steps-action {
  margin-top: 12px;
  text-align: center;
}

.main-container {
  margin: 20px;
  padding: 16px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),0 1px 6px -1px rgba(0, 0, 0, 0.02),0 2px 4px 0 rgba(0, 0, 0, 0.02);
  border-radius: 8px;
}

</style>
