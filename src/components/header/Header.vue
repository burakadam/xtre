<template>
  <div>
    <header :class="isSearchBoxOpen || isSelectBoxOpen ? '' : 'border-b'">
      <MenuButton :isMenuOpen="isMenuOpen" @click="handleMenuButtonClick" />
      <router-link
        to="/"
        id="header__logo"
        :title="this.GetLabel(this, 'leftmenu_dashboard')"
      >
        <v-img
          alt="Xtre"
          class="header__logo"
          src="@/assets/images/xtre-icon.svg"
        ></v-img>
      </router-link>
      <div id="header__content">
        <div>
          <v-btn text id="search-box-btn" @click="handleSelectBoxClick">
            <span class="fbold">NTS - ABC</span>
            <span class="fbold">&nbsp/&nbsp</span>
            <span class="fbold">NTSPR2021FIGasdasdasdas</span>
            <span class="fbold">&nbsp/&nbsp</span>
            <span class="fbold">A1 - Master</span>
          </v-btn>
          <v-btn @click="handleSelectBoxClick">Git</v-btn>
          <v-btn outlined @click="handleSearchButtonClick">
            <i class="fal fa-search"></i>
          </v-btn>
        </div>
        <div>
          <slot />
          <HeaderLink
            to="/settings"
            label="settings"
            title="settings"
            icon="fal fa-cog"
          />
          <HeaderLink
            to="/notifications"
            label="notifications"
            title="notifications"
            icon="fal fa-bell"
            bubble="2"
          />
        </div>
      </div>
    </header>
    <div class="search-box" :class="isSelectBoxOpen ? 'active' : ''">
      <v-btn text class="close-search-box" @click="handleCloseClick">
        <i class="fa fa-times"></i>
      </v-btn>
      <div class="d-flex">
        <div class="selectbox">
          <SelectBox
            :items="clients"
            itemText="name"
            itemVelue="id"
            label="customer"
            borderColor="blue"
            :selectedItemValue="1"
            fontBold
          />
        </div>
        <div class="selectbox">
          <SelectBox
            :items="projects"
            itemText="name"
            itemVelue="id"
            label="user_management_projects"
            borderColor="blue"
            :selectedItemValue="1"
            fontBold
          />
        </div>
        <div class="selectbox">
          <SelectBox
            :items="forecast"
            itemText="name"
            itemVelue="id"
            label="forecast"
            borderColor="blue"
            :selectedItemValue="1"
            fontBold
          />
        </div>
        <div class="search-box__btn">
          <v-btn>Git</v-btn>
        </div>
        <div class="search-box__btn">
          <v-btn outlined>
            Ara
            <i class="fal fa-search"></i>
          </v-btn>
        </div>
      </div>
    </div>
    <div class="search-box equal" :class="isSearchBoxOpen ? 'active' : ''">
      <v-btn text class="close-search-box" @click="handleCloseClick">
        <i class="fa fa-times"></i>
      </v-btn>
      <div class="d-flex">
        <div id="header__search-input">
          <dxFormTextInput type="text" :hasBorder="true" :hideDetails="true" />
        </div>
        <v-btn @click="handleSearchButtonClick">Ara</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderLink from './HeaderLink.vue'
import MenuButton from './MenuButton.vue'
import SelectBox from '../form/SelectBox.vue'

import dxFormTextInput from '../customcontrols/dxInput/dxFormTextInput/dxFormTextInput.vue'

export default {
  name: 'Header',
  components: {
    MenuButton,
    HeaderLink,
    SelectBox,
    dxFormTextInput
  },
  props: {
    isMenuOpen: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      clientsModel: '1',
      projetcModel: '1',
      forecastModel: '1',
      isSearchBoxOpen: false,
      isSelectBoxOpen: false,
      clients: [
        {
          label: 'NTS - ABC',
          value: 1
        },
        {
          label: 'NTS - DEF',
          value: 2
        },
        {
          label: 'NTS - BVC',
          value: 3
        }
      ],
      projects: [
        {
          label: 'NTSPR2021FIGO - Financial Governance',
          value: 1
        },
        {
          label: 'NTSPR2021FIGO - Financial',
          value: 2
        },
        {
          label: 'NTSPR2021FIGO - Governance',
          value: 3
        }
      ],
      forecast: [
        { label: 'A1 - Master', value: 1 },
        { label: 'A2 - Master', value: 2 },
        { label: 'A3 - Master', value: 3 }
      ]
    }
  },
  methods: {
    handleMenuButtonClick () {
      this.$emit('menuButtonClick')
    },
    handleSearchButtonClick () {
      this.isSearchBoxOpen = !this.isSearchBoxOpen
      this.isSelectBoxOpen = false
    },
    handleSelectBoxClick () {
      this.isSelectBoxOpen = !this.isSelectBoxOpen
      this.isSearchBoxOpen = false
    },
    handleCloseClick () {
      this.isSelectBoxOpen = false
      this.isSearchBoxOpen = false
    }
  }
}
</script>
<style>
header {
  width: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 7px;
  position: relative;
}

header::after {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  width: 0%;
  height: 1px;
  background: var(--greyLight);
  transition: width 450ms ease-in-out;
}
header.border-b:after {
  width: 100%;
}
.header__logo {
  width: 65px;
}
#header__content {
  flex: 1;
  display: flex;
  align-items: center;
}
#header__content > div {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
#header__content > div:first-child {
  flex: 1;
  justify-content: flex-start;
  padding-left: 32px;
}
#header__content .v-btn {
  height: 31px !important;
}
#search-box-btn {
  max-width: 413px;
}
#search-box-btn i {
  color: var(--blueDark);
  font-weight: 600;
  transition: transform 250ms ease-in-out;
}
#search-box-btn i.active {
  transform: rotate(180deg);
}
#search-box-btn + button + button {
  min-width: 37px;
  padding: 0;
  margin-left: 8px;
}
#search-box-btn .v-btn__content > span {
  max-width: 81px;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
  font-family: 'Avenir-Heavy';
}
.search-box {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 300ms ease-in-out, opacity 300ms ease-in-out;

  position: relative;
}
.search-box.active {
  max-height: 600px;
  opacity: 1;
  overflow: visible;
}
.search-box.equal {
  margin-bottom: 9px;
}

.search-box.equal > div {
  padding: 9px 22px 9px 142px;
}
.close-search-box.v-btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px !important;
  border-radius: 10px;
  padding: 0;
  min-width: unset !important;
}
.close-search-box i {
  font-size: 15px;
  font-weight: 400 !important;
  color: var(--greyDark);
}
.search-box > div {
  background: var(--whiteFlash);
  border-radius: 10px;
  padding: 9px 22px 15px 22px;
  width: 100%;
  margin: 0;
}
.search-box > div > div {
  display: flex;
  align-items: flex-end;
  padding: 0 6px;
}
.search-box .selectbox {
  flex: 1;
}
.search-box .selectbox:nth-child(2) {
  flex-basis: 20%;
}
.search-box > div > div > * {
  width: 100%;
}

#header__search-input {
  width: 100%;
  max-width: 557px;
}
#header__search-input .v-input__control {
  background: var(--white);
}
@media screen and (max-width: 1024px) {
  .search-box > div {
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .search-box .search-box__btn {
    width: 50%;
    margin-top: 22px;
  }
  .search-box .selectbox {
    flex: none;
    flex-basis: 33% !important;
    width: 33%;
  }
  .search-box.equal > div {
    padding: 9px 32px 15px 22px;
    width: 100%;
  }
  #header__search-input {
    max-width: unset;
    padding: 0;
    margin-bottom: 12px;
  }
  #header__search-input + button {
    width: 100%;
  }
  #header__content > div:first-child {
    padding-left: 12px;
  }
  #search-box-btn {
    padding: 0 8px;
  }
  #search-box-btn .v-btn__content > span {
    font-size: var(--fxxxs);
    max-width: 55px;
    margin-right: 0;
  }
}
@media screen and (max-width: 700px) {
  .header__logo {
    width: 45px;
  }
  .search-box > div {
    flex-direction: column;
    padding: 3px 11px 14px 11px;
  }
  .search-box .selectbox,
  .search-box .search-box__btn {
    width: 100%;
    flex-basis: auto !important;
    margin-top: 11px;
  }
  #search-box-btn {
    display: none;
  }

  #search-box-btn + button {
    border: none;
    min-width: unset;
  }
  #header__content > div > a:first-child {
    margin-left: 0;
  }
}
@media screen and (max-width: 320px) {
  #search-box-btn + button {
    margin-left: 0;
  }
  #header__logo {
    display: none;
  }
}
</style>
