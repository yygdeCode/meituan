<template>
    <div class="search-panel">
        <el-row class="m-header-searchbar">
            <el-col :span="3" class="left">
                <router-link :to="{name:'index'}">
                    <img :src="logo" alt="美团">
                </router-link>
            </el-col>
            <el-col :span="15" class="center">
                <div class="wrapper">
                    <el-input v-model="searchWord" placeholder="搜索商家或地点" @focus="focusInput" @blur="blurInput" @input="inputWord"></el-input>
                    <el-button type="primary" icon="el-icon-search"></el-button>
                    <dl class="hotPlace" v-show="isHotPlace">
                        <dt>热门搜索</dt>
                        <dd v-for="(item, index) in hotPlaceList" :key="item + '_'+ index">
                            <router-link  :to="{name: 'goods', params: {name: item}}">{{item}}</router-link>
                        </dd>
                    </dl>
                    <dl class="searchList" v-show="isSearchList">
                        <dd v-for="(item, index) in searchList" :key="index">
                            <router-link :to="{name: 'goods', params: {name: item}}">{{item}}</router-link>
                        </dd>
                    </dl>
                </div>
                <p class="suggest">
                    <router-link v-for="(item, index) in suggestList" :key="item + '~' + index" :to="{name: 'goods', params: {name: item}}">{{item}}</router-link>
                </p>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import api from '@/api/index.js'
export default {
    data() {
        return {
            searchWord: '',
            isFocus: false,
            hotPlaceList: [],
            searchList: [],
            suggestList: [],
            logo:"//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
        }
    },
    created() {
        api.getSearchHotList().then((res) => {
            if (res.data.status == 'success') {
                this.hotPlaceList = res.data.data;
                this.suggestList = res.data.data;
            }
        })
    },
    computed: {
        isHotPlace() {
            return !this.searchWord && this.isFocus;
        },
        isSearchList() {
            return this.searchWord && this.isFocus;
        }
    },
    watch: {
        "$route.params.name": function () {
            this.searchWord = this.$route.params.name;
        }
    },
    methods: {
        focusInput() {
            this.isFocus = true;
        },
        blurInput() {
            var self = this;
            setTimeout(function() {
                self.isFocus = false;
            }, 200)
        },
        inputWord() {
            api.getSearchList().then((res) => {
                console.log(res)
                if (res.data.status === 'success') {
                    this.searchList = res.data.data.list.filter((item) => item.indexOf(this.searchWord) > -1);
                }
            });

        },
        created(){
            this.inputWord()
        }
    }
}
</script>

<style lang="scss">
    @import "@/assets/css/public/header/index.scss";
    @import "@/assets/css/public/header/search.scss";
</style>
