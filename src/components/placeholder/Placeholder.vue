<template>
    <div class="placeholder">
        <div class="placeholder__img"></div>
        <div class="placeholder__txt" >
            <div class="placeholder__txt-block" v-for="item in paragraphs" :key="item"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Placeholder',
  props: {
    paragraphs: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="scss">
.placeholder {
    &__img {
        background:#DEDEDE;
        height: 136px;
        border-radius: 4px;
        margin:0 auto 22px;
    }

    &__txt {
        &-block {
            height: 14px;
            background: #DEDEDE;
            width:90%;
            border-radius: 4px;
            margin:0px 0 calc(30px * 2 + 18px);
            position: relative;

            &:before {
                content:"";
                position: absolute;
                height: inherit;
                width:67%;
                background:inherit;
                border-radius: inherit;
                top:calc(100% + 8px);
                left:0;
            }

            &:after {
                content:"";
                position: absolute;
                height: inherit;
                width:38%;
                background:inherit;
                border-radius: inherit;
                top:calc(100% + 30px);
                left:0;
            }
        }
    }
}

</style>
