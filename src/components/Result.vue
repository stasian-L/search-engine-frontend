<template>
    <div class="result">
        <div class="result__icon">
            <img :src="iconUrl" alt="Site Icon" />
        </div>
        <div class="result__content">
            <h2 class="result__title">
                <a class="result__a" rel="noopener" :href="url">{{title}}</a>
            </h2>
            <div class="result__url">
                <a class="result__url" rel="noopener" :href="url">
                    <span class="result__url__domain">{{url}}</span>
                </a>
            </div>
            <div class="result__description">{{description}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['title', 'url', 'description'],
    computed: {
        iconUrl() {
            const urlObject = new URL(this.url);
            const baseUrl = `${urlObject.protocol}//${urlObject.host}`;
            return `${baseUrl}/favicon.ico`;
        }
    }
};
</script>

<style>
.result {
    font-family: Arial, sans-serif;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-font-smoothing: subpixel-antialiased;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    margin-bottom: 1.2em;
    position: relative;
    word-wrap: break-word;
    border-radius: 4px;
    border: 1px solid transparent;
}
.result__title {
    font-family: Arial, sans-serif;
    position: static;
    overflow: hidden;
    display: block;
    font-size: 1.1em;
    font-weight: normal;
    text-align: left;
    line-height: 1.22;
    padding: 0;
    margin: 0 0 0.15em;
    max-width: 100%;
}
.result__a {
    font-family: Arial, sans-serif;
    vertical-align: middle;
    display: inline-block;
    max-width: 100%;
    color: #00278e;;
    font-family: inherit;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    line-height: 1.22;
    margin-bottom: -0.05em;
}

.result__url {
    color: #20692b;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    font-size: 0.95em;
    vertical-align: baseline;
    text-decoration: none;
    text-align: left;
    margin-top: 6px;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.result__description {
    text-align: left;
    font-size: 0.95em;
    font-weight: 10;
}

a:hover {
    text-decoration: underline;
}

.result__icon img{
    position: absolute;
    top: 2px;
    left: -35px;
    max-height: 25px;
    max-width: 25px;
}
</style>