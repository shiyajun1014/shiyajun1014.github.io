---
sidebarDepth: 2
title: 第三方库
---

# 第三方库

## jsencrypt 实现密码加密

[jsencrypt](https://github.com/travist/jsencrypt)

```js
import { JSEncrypt } from 'jsencrypt'

Vue.prototype.$encryptedData = function(publicKey, password) {
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey)
  const result = encrypt.encrypt(password)
  return result
}

Vue.prototype.$decryptData = function(privateKey, secretWord) {
  const decrypt = new JSEncrypt()
  decrypt.setPrivateKey(privateKey)
  const result = decrypt.decrypt(secretWord)
  return result
}
```

## clipboard 实现复制粘贴

[clipboard](https://github.com/zenorocha/clipboard.js)

```js
<!-- Target -->
<input id="foo" value="https://github.com/zenorocha/clipboard.js.git">

<!-- Trigger -->
<button class="btn" data-clipboard-target="#foo">
    <img src="assets/clippy.svg" alt="Copy to clipboard">
</button>
```

## lrz 实现图片压缩

[lrz](https://github.com/think2011/localResizeIMG)

```js
import lrz from 'lrz'

afterUploadFileRead(file, detail) {
  var that = this
  lrz(file.file, { width: 800 }).then(function (rst) {
    if (rst.fileLen > 1024 * 1024 * 3) {
      return that.$toast('图片大小超过限制!')
    }
    uploadPic(rst.formData).then((res) => {
      const { data, code } = res.data
      if (code !== 0) {
        return that.$toast('上传失败，请稍后再试!')
      }
      that[detail.name][detail.index].key = data.key
    })
  })
}
```

## 腾讯地图实现地图选点

[腾讯地图](https://lbs.qq.com/webApi/component/componentGuide/componentPicker)

```vue
<!-- 腾讯地图组件，配合 vant 和 jQuery 使用 -->
<template>
  <div class="map">
    <iframe id="mapPage" width="100%" height="100%" frameborder="0" :src="getSrc"> </iframe>
  </div>
</template>

<script>
import jquery from 'jquery'

export default {
  name: 'TecentMap',
  data() {
    return {
      mapKey: 'BL4BZ-NXLCW-BBGRX-RA3CY-GGUIO-WSBS3',
    }
  },
  computed: {
    getSrc() {
      let baseUrl =
        'https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=' + this.mapKey + '&referer=' + this.keyName
      if (this.lat && this.lng) {
        baseUrl += `&coord=${this.lat},${this.lng}`
      }
      return baseUrl
    },
  },
  props: {
    keyName: {
      type: String,
      default: 'demo',
    },
    lat: {
      type: [String, Number],
    },
    lng: {
      type: [String, Number],
    },
  },

  mounted() {
    const that = this
    window.addEventListener(
      'message',
      function(event) {
        // 对于无法识别的地址，直接返回无法选择
        const loc = event.data
        if (loc.poiname === '我的位置' || loc.poiaddress === '') {
          vant.Toast('无法识别该地址，请移动地图重新选择')
          return false
        }
        if (loc && loc.module === 'locationPicker') {
          const { latlng } = loc
          jquery.ajax({
            type: 'GET',
            url: 'https://apis.map.qq.com/ws/geocoder/v1/',
            data: {
              location: latlng.lat + ',' + latlng.lng,
              key: that.mapKey,
              output: 'jsonp',
            },
            dataType: 'jsonp',
            success: function(result) {
              if (result.status == 0) {
                const { address_component, formatted_addresses } = result.result
                const address = address_component.province + address_component.city + address_component.district
                const detailAddress = formatted_addresses.recommend
                that.$emit('callback', {
                  address,
                  detailAddress,
                })
              } else {
                return vant.Toast('未能定位，请重新选择！')
              }
            },
          })
        }
      },
      false
    )
  },
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
```

```vue
<!-- 在需要的页面使用组件 -->
<template>
  <div>
    <van-popup v-model="showMap" position="right" :style="{ height: '100%', width: '100%' }">
      <tecent-map @callback="locationSelectCallback" />
    </van-popup>
  </div>
</template>

<script>
import TecentMap from '@/components/tecent-map'

export default {
  data() {
    return {
      showMap: false,
    }
  },

  components: {
    TecentMap,
  },

  methods: {
    locationSelectCallback(location) {
      this.address = location.address
      this.detailAddress = location.detailAddress
      this.showMap = false
    },
  },
}
</script>
```
