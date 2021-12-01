<template>
  <div style="width: 100%" ref="fakeDivRef">
    <div class="table-div">
      <div class="fake-div" :style="`width:${fakeWidth}px`">
        <div
          :style="`height:${fakeHeaderHeight}px;line-height:${fakeHeaderHeight}px`"
        >
          <p>{{ this.headers[0].text }}</p>
        </div>
        <div v-for="(item, idx) in this.items" v-if="idx < itemsPerPage">
          <p :key="idx">{{ item[Object.keys(item)[0]] }}</p>
        </div>
      </div>
      <div class="table-div__container">
        <div class="mainDiv">
          <v-data-table
            :value="selectedItems"
            :headers="headers"
            :items="items"
            :search="search"
            :show-select="showCheckbox"
            :item-key="itemKey"
            :class="classType"
            @input="itemSelected"
            hide-default-footer
            :items-per-page="itemsPerPage"
            :page.sync="page"
            @page-count="pageCount = $event"
            :mobile-breakpoint="null"
          >
            <template v-slot:top>
              <!-- <v-toolbar flat v-if="showToolbar">
          <v-text-field
            v-if="showSearch"
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>

          <v-spacer></v-spacer>

          <slot name="fabs"> </slot>

          <v-btn
            v-if="isAddButtonVisible"
            color="primary"
            fab
            x-small
            dark
            class="mb-2"
            @click="newItem"
            ><v-icon>fas fa-plus-circle</v-icon>
          </v-btn>
        </v-toolbar> -->

              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline">{{
                    GetMessage(this, 'approve_delete')
                  }}</v-card-title>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="blue darken-1" text @click="closeDelete">{{
                      GetLabel(this, 'cancel')
                    }}</v-btn>

                    <v-btn
                      color="blue darken-1"
                      text
                      @click="deleteItemConfirm"
                      >{{ GetLabel(this, 'ok') }}</v-btn
                    >

                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.actions="row">
              <!--headers ta actions objesi olmali-->

              <slot name="actions" :item="row">
                <v-icon
                  small
                  class="mr-2"
                  v-if="isEditable"
                  @click="editItem(row)"
                >
                  fas fa-edit
                </v-icon>
                <v-icon
                  x-small
                  small
                  v-if="isDeletable"
                  @click="deleteItem(row)"
                >
                  fas fa-trash
                </v-icon>
                <v-icon
                  x-small
                  small
                  v-if="isPermissions"
                  @click="permissionItem(row)"
                >
                  fas fa-user-lock
                </v-icon>
              </slot>
            </template>
            <template v-slot:no-data>
              <span>{{ GetLabel(this, 'data_no_found') }}</span>
            </template>

            <template
              v-for="header in customCols"
              v-slot:[`item.${header.value}`]="{ item }"
            >
              <slot :name="header.value" :item="item">
                {{ item[header.value] }}
              </slot>
            </template>
          </v-data-table>
        </div>
      </div>
    </div>

    <div class="pagination-container" v-if="pagination">
      <p>{{ this.GetLabel(this, 'page') }}</p>
      <v-pagination
        v-model="page"
        :length="pageCount"
        next-icon="fas fa-chevron-right"
        prev-icon="fas fa-chevron-left"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dxTableComponent',
  data () {
    return {
      page: 1,
      pageCount: 0,
      search: '',
      dialog: false,
      dialogDelete: false,
      dialogCopy: false,
      selectedItem: -1,
      editedItem: {},
      defaultItem: {},
      selectedItems: [],
      fakeWidth: 0,
      fakeHeaderHeight: 30
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    dialogCopy (val) {
      val || this.closeDelete()
    },
    selected: {
      handler: function (val) {
        var _this = this
        _this.selectedItems = []
        val.forEach((element) => {
          _this.selectedItems.push(element)
        })
      },
      immediate: true
    }
  },
  props: {
    itemsPerPage: {
      type: Number,
      default: 10
    },
    tableTitle: {
      type: String,
      default: ''
    },
    pagination: {
      type: Boolean,
      default: true
    },
    hidedefaultheader: Boolean,
    classType: {
      type: String,
      default: 'elevation-1'
    },
    whichTable: {
      type: String
    },
    headers: {
      type: Array,
      default: () => [],
      note: 'JSON formatted data that will be listed in the Table'
    },
    items: {
      type: Array,
      default: () => [],
      note: 'JSON formatted data that will be listed in the Table'
    },
    showFields: {
      type: Array,
      default: () => [],
      note: 'String array that will be filtered in the Table'
    },
    showToolbar: {
      type: Boolean,
      required: false,
      default: false
    },
    showSearch: {
      type: Boolean,
      required: false,
      default: false
    },
    isAddButtonVisible: {
      type: Boolean,
      required: false,
      default: true
    },
    isCopyButtonVisible: {
      type: Boolean,
      required: false,
      default: false
    },
    isDeleteButtonVisible: {
      type: Boolean,
      required: false,
      default: true
    },
    showFooter: {
      type: Boolean,
      required: false,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      required: false,
      default: false
    },
    showRowAction: {
      type: Boolean,
      required: false,
      default: false
    },
    renderAddDialog: {
      type: Boolean,
      required: false,
      default: false
    },
    itemKey: {
      type: String,
      required: false
    },
    selected: {
      type: Array,
      default: () => []
    },
    isEditable: {
      type: Boolean,
      required: false,
      default: true
    },
    isDeletable: {
      type: Boolean,
      required: false,
      default: true
    },
    isPermissions: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    newItem () {
      this.$emit('new-item')
    },
    permissionItem (row) {
      this.selectedItem = row.item
      var index = this.items.indexOf(this.selectedItem)
      this.$emit('permission-item', row.item, index)
    },
    editItem (row) {
      this.selectedItem = row.item
      var index = this.items.indexOf(this.selectedItem)
      this.$emit('edit-item', row.item, index)
    },
    deleteItem (row) {
      this.selectedItem = row.item
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      var index = this.items.indexOf(this.selectedItem)
      this.$emit('delete-item', this.selectedItem, index)
      this.closeDelete()
    },
    closeDelete () {
      this.dialogDelete = false
    },
    itemSelected (val) {
      if (this.selectedItems !== val) {
        this.selectedItems = val
        this.$emit('selectionChanged', val)
      }
    }
  },
  computed: {
    customCols () {
      return this.headers.filter((h) => h.customRender)
    }
  },
  updated () {
    this.fakeWidth = this.$refs.fakeDivRef.querySelectorAll(
      'tbody tr:first-child td'
    )[0].offsetWidth
    this.fakeHeaderHeight = this.$refs.fakeDivRef.querySelectorAll(
      'thead tr:first-child th'
    )[0].offsetHeight
  }
}
</script>
