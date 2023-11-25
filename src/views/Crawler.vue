<template>
    <div class="dropdown">
        <button @click="toggleDropdown" class="dropdown-button">Crawler</button>
        <ul :class="{ 'menu-list': true, 'is-visible': showDropdown }">
            <li v-for="item in menuItems" :key="item.id">
                <div class="menu-item" @click="openForm(item.id)">{{ item.name }}</div>
            </li>
        </ul>
        <div v-if="showModal" class="modal-background">
            <div class="modal-container">
                <component :is="currentForm" @close="closeForm" />
            </div>
        </div>
    </div>
</template>
<script>
import CrawlUrlForm from '@/components/CrawlUrlForm.vue'
import CrawlDomainForm from '@/components/CrawlDomainForm.vue'

export default {
    components: {
        CrawlUrlForm,
        CrawlDomainForm
    },
    data() {
        return {
            showDropdown: false,
            menuItems: [
                { id: 1, name: 'Crawl URL' },
                { id: 2, name: 'Crawl domain' },
            ],
            showModal: false,
            currentForm: ''
        }
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown
        },
        openForm(itemId) {
            this.currentForm = this.getFormName(itemId)
            this.showModal = true
        },
        closeForm() {
            this.showModal = false
        },
        getFormName(itemId) {
            switch(itemId) {
                case 1:
                    return 'crawl-url-form'
                case 2:
                    return 'crawl-domain-form'
                default:
                    return ''
            }
        }
    }
}
</script>
<style>
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-button {
    width: 70px;
    height: 25px;
    border: 1px solid #242622;
    border-radius: 15px;
    box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.2);
    background-color: white;
}

.dropdown-button:hover, .dropdown-button:active {
    background-color: #333333;
    color: white;
}

.menu-list {
    position: absolute;
    top: 100%;
    width: 130%;
    right: 0;
    z-index: 1;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    margin: 5px 0px;
    list-style: none;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}

.is-visible {
    opacity: 1;
}

.menu-item {
    display: block;
    padding: 5px 0;
    color: #333;
    font-size: 12px;
    text-decoration: none;
    text-align: left;
}

.menu-item:hover {
    background-color: #f2f2f2;
    cursor: pointer;
}

.modal-background {
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-container {
    position: absolute;
    top: 25%;
    width: 300px;
    z-index: 99999;
    background-color: #f2f2f2;
    border-radius: 5px;

}
</style>