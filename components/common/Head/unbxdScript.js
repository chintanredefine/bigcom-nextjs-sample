export const someUnbsdCategoryScripts = () => {
  window.unbxdSearch = new UnbxdSearch({
    siteKey: 'sleekhair_mybigcommerce_com-u1474746314480',
    apiKey: 'a32a56fd1a3bd51b04a38278db19e452',
    hashMode: false,
    updateUrls: true,
    searchBoxEl: document.getElementById('unbxdInput'),
    searchTrigger: 'click',
    searchButtonEl: document.getElementById('searchBtn'),
    products: {
      el: document.getElementById('searchResultsWrapper'),
      productType: 'SEARCH',
    },
    spellCheck: {
      enabled: true,
      el: document.getElementById('didYouMeanWrapper'),
    },
    noResults: {
      el: document.getElementById('noResultWrapper'),
    },
    facet: {
      facetsEl: document.getElementById('facetsWrapper'),
      selectedFacetsEl: document.getElementById('selectedFacetWrapper'),
      selectedFacetClass: 'UNX-selected-facet-btn',
    },
    pagination: {
      type: 'INFINITE_SCROLL',
    },
    breadcrumb: {
      el: document.getElementById('breadcrumpContainer'),
    },
    pagesize: {
      el: document.getElementById('changeNoOfProducts'),
    },
    loader: {
      el: document.getElementById('loaderEl'),
    },
    productView: {
      el: document.getElementById('productViewTypeContainer'),
      viewTypes: 'GRID',
    },
    banner: {
      el: document.getElementById('bannerContainer'),
      count: 1,
    },
    sort: {
      el: document.getElementById('sortWrapper'),
      options: [
        {
          value: 'sortPrice desc',
          text: 'Price High to Low',
        },
        {
          value: 'sortPrice asc',
          text: ' Price Low to High',
        },
      ],
      action: 'click',
      template: function (selectedSort) {
        var sortBtnsUI = ''
        var self = this
        this.options.sort.options.forEach(function (item, index) {
          var selectedCss = ''
          if (item.value === selectedSort) {
            selectedCss = self.options.sort.selectedSortClass
          }
          sortBtnsUI += [
            '<div class="btn UNX-sort-btn ' +
              self.options.sort.sortClass +
              ' ' +
              selectedCss +
              '"',
            'data-value="' +
              item.value +
              '" data-action="changeSort"> ' +
              item.text +
              '</div>',
          ].join('')
        })
        return sortBtnsUI
      },

      onEvent: (context, type) => {
        if (type === 'BEFORE_API_CALL') {
          context.state.currentUrl =
            context.state.currentUrl.replace('pagetype=boolean')
        }
      },
    },
  })
}
