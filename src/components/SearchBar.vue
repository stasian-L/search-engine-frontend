<template>
    <div class="search-bar">
        <form class="search-bar__form" @submit.prevent="onSubmit">
            <input type="hidden" id="offset" name="offset"  v-model="offset"/>
            <input type="hidden" id="limiter" name="limit" v-model="limit"/>
            <input type="hidden" id="region" name="region" v-model="region"/>
            <input
                class="search-bar__input"
                name="q"
                autocomplete="off"
                id="search_form_input"
                spellcheck="false"
                v-model="q"
                @input="onSearchInputChange"
                list="browserList"
            />
            <datalist id="browserList" style="width: 1000px">
                <option v-for="suggestion in suggestions">{{ suggestion }}</option>
            </datalist>
            <i
                id="search_form_input_clear"
                class="icon-cross"
                v-bind:class="{ visible: isInputNotEmpty }"
                @click="onClearIconClick"
            ></i>
            <input 
                class="search-bar__button" 
                type="submit" 
                id="search_button" 
                value="🔍︎"
                />
        </form>
    </div>
</template>

<script>
export default {
    props: ['suggestions'],
    data() {
        return {
            offset: 0,
            limit: 20,
            region: "",
            q: new URLSearchParams(window.location.search).get('q'),
            isInputNotEmpty: false
        }
    },
    methods: {
        onSubmit() {
            if(this.q.trim()) {
                const query = {
                    q: this.q,
                    limit: this.limit,
                    offset: this.offset,
                    region: this.region
                }
                this.$emit('search', query)
            }
        },
        onSearchInputChange() {
            if(this.q !== "") this.isInputNotEmpty = true;
            else this.isInputNotEmpty = false;
        },
        onClearIconClick(event, item) {
            this.isInputNotEmpty = false;
            this.q = "";
        }
    }
}
</script>


<style>
.search-bar {
    font: inherit;
    vertical-align: baseline;
    height: 100%;
}

.search-bar__form {
    border: 2px solid rgb(0 0 0 / 12%);
    border-radius: 30px;
    display: flex;
    justify-content: space-between;
    height: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add box-shadow property */
    background-color: white;
}
.search-bar__form:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.search-bar__form:has(.search-bar__input:focus) {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.search-bar__input {
    width: 100%;
    font-size: 15px;
    border: none;
    outline: none;
    margin: 5px 5px 5px 15px;
}

.search-bar__button {
    border: none;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    font-size: 23px;
    width: 60px;
}

.search-bar__button:hover {
    background-color: rgba(0, 0, 0, 0.15);
}
.icon-cross {
  padding-top: 4.5px;
  margin-right: 7px;
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
    display: none;
}
.icon-cross:hover {
  opacity: 1;
}

.icon-cross:before, .icon-cross:after {
  position: absolute;
  content: ' ';
  height: 25px;
  width: 2px;
  background-color: #333;
}

.icon-cross:before {
  transform: rotate(45deg);
}
.icon-cross:after {
  transform: rotate(-45deg);
}
.visible {
    display: block;
}
</style>