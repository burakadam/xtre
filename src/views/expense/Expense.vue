<template>
  <div class="d-flex flex-wrap justify-space-between">
    <div class="w-half">
      <ShadowContent
        title="notifications"
        titleIcon="fal fa-bell"
        to="/notifications"
        linkText="see-all"
      >
        <DataTable :headers="notificationHeaders" :items="notificationData">
          <template v-slot:default="item">
            <router-link :to="`/notifications?${item.item.id}`">
              <i class="fal fa-edit"></i>
            </router-link>
          </template>
        </DataTable>
      </ShadowContent>
    </div>
    <div class="w-half">
      <ShadowContent
        title="expense"
        titleIcon="fal fa-list-alt"
        to="/expense/expense-list"
        linkText="see-all"
      >
        <DataTable :headers="notificationHeaders" :items="notificationData">
          <template v-slot:default="item">
            <router-link :to="`/${item.item.id}`">
              <i class="fal fa-edit"></i>
            </router-link>
          </template>
        </DataTable>
      </ShadowContent>
    </div>
    <div class="w-half">
      <ShadowContent
        title="invoices"
        titleIcon="fal fa-file-invoice"
        to="/"
        linkText="see-all"
      >
        <DataTable :headers="notificationHeaders" :items="notificationData">
          <template v-slot:default="item">
            <router-link :to="`/${item.item.id}`">
              <i class="fal fa-edit"></i>
            </router-link>
          </template>
        </DataTable>
      </ShadowContent>
    </div>
    <div class="w-half">
      <ShadowContent
        title="documents"
        titleIcon="fal fa-file-invoice"
        to="/"
        linkText="see-all"
      >
        <DataTable :headers="notificationHeaders" :items="notificationData">
          <template v-slot:default="item">
            <router-link :to="`/${item.item.id}`">
              <i class="fal fa-edit"></i>
            </router-link>
          </template>
        </DataTable>
      </ShadowContent>
    </div>
  </div>
</template>
<script>
import ShadowContent from '../../components/shadow-content/ShadowContent'
import DataTable from '../../components/data-table/DataTable'
export default {
  components: { ShadowContent, DataTable },
  data () {
    return {
      notificationHeaders: [
        {
          text: 'Bildirim',
          align: 'start',
          sortable: false,
          value: 'notification'
        },
        {
          text: 'Müşteri',
          align: 'start',
          sortable: false,
          value: 'client'
        },
        {
          text: 'Proje',
          align: 'start',
          sortable: false,
          value: 'project'
        },
        { text: '', value: 'actions' }
      ],
      notificationData: [
        {
          id: 1,
          notification: 'A1 Master',
          client: 'NTS - ABC',
          project: 'NTSPR2021FIGO - Financial Governance'
        },
        {
          id: 2,
          notification: 'A1 Master',
          client: 'NTS - ABC',
          project: 'NTSPR2021FIGO - Financial Governance'
        },
        {
          id: 3,
          notification: 'A1 Master',
          client: 'NTS - ABC',
          project: 'NTSPR2021FIGO - Financial Governance'
        }
      ]
    }
  }
}
</script>
