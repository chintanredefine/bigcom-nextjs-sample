import $ from 'jquery'

const SomeFunc = () => {
  var unbxdAutoSuggestFunction = function (c, u, e) {
    ;(window.Unbxd = window.Unbxd || {}),
      (Unbxd.autosuggestVersion = '1.0.1'),
      window.location.origin ||
        (window.location.origin =
          window.location.protocol +
          '//' +
          window.location.hostname +
          (window.location.port ? ':' + window.location.port : '')),
      Array.prototype.forEach ||
        (Array.prototype.forEach = function (t, s) {
          var e
          if (null == this) throw new TypeError(' this is null or not defined')
          var i = Object(this),
            o = i.length >>> 0
          if ('function' != typeof t)
            throw new TypeError(t + ' is not a function')
          1 < arguments.length && (e = s)
          for (var n, r = 0; r < o; )
            r in i && ((n = i[r]), t.call(e, n, r, i)), r++
        }),
      Array.prototype.indexOf ||
        (Array.prototype.indexOf = function (t, s) {
          var e
          if (null == this) throw new TypeError('"this" is null or not defined')
          var i = Object(this),
            o = i.length >>> 0
          if (0 == o) return -1
          s = +s || 0
          if (o <= (s = Math.abs(s) === 1 / 0 ? 0 : s)) return -1
          for (e = Math.max(0 <= s ? s : o - Math.abs(s), 0); e < o; ) {
            if (e in i && i[e] === t) return e
            e++
          }
          return -1
        })
    function h(t, s) {
      return t.length - s.length == 0 ? t.localeCompare(s) : t.length - s.length
    }
    var l = '',
      p = {
        Android: function () {
          return navigator.userAgent.match(/Android/i)
        },
        BlackBerry: function () {
          return navigator.userAgent.match(/BlackBerry/i)
        },
        iOS: function () {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        Opera: function () {
          return navigator.userAgent.match(/Opera Mini/i)
        },
        Windows: function () {
          return navigator.userAgent.match(/IEMobile/i)
        },
        any: function () {
          return (
            p.Android() || p.BlackBerry() || p.iOS() || p.Opera() || p.Windows()
          )
        },
      }
    function s(t, s) {
      ;(this.input = t), this.init(t, s)
    }
    u.registerHelper('unbxdIf', function (t, s, e) {
      return t === s ? e.fn(this) : e.inverse(this)
    }),
      u.registerHelper('safestring', function (t) {
        return new u.SafeString(t)
      }),
      (window.autoSuggestObj = c.extend(s.prototype, {
        default_options: {
          siteName: 'demosite-u1407617955968',
          APIKey: '64a4a2592a648ac8415e13c561e44991',
          integrations: {},
          resultsClass: 'unbxd-as-wrapper',
          minChars: 3,
          delay: 100,
          loadingClass: 'unbxd-as-loading',
          mainWidth: 0,
          sideWidth: 180,
          zIndex: 1e4,
          position: 'absolute',
          sideContentOn: 'right',
          template: '1column',
          theme: '#ff8400',
          hideOnResize: !1,
          mainTpl: [
            'inFields',
            'keywordSuggestions',
            'topQueries',
            'popularProducts',
            'promotedSuggestions',
          ],
          sideTpl: [],
          showCarts: !0,
          cartType: 'inline',
          onCartClick: function (t) {},
          hbsHelpers: null,
          onSimpleEnter: null,
          onItemSelect: null,
          noResultTpl: null,
          mobile: {
            template: '1column',
            mainTpl: [
              'inFields',
              'keywordSuggestions',
              'topQueries',
              'promotedSuggestions',
              'popularProducts',
            ],
            popularProducts: { count: 2 },
          },
          trendingSearches: {
            enabled: !0,
            tpl: '{{{safestring highlighted}}}',
            maxCount: 6,
            preferInputWidthTrending: !0,
          },
          inFields: {
            count: 2,
            fields: { brand: 3, category: 3, color: 3 },
            header: '',
            tpl: '{{{safestring highlighted}}}',
          },
          topQueries: {
            count: 2,
            hidden: !1,
            header: '',
            tpl: '{{{safestring highlighted}}}',
          },
          keywordSuggestions: {
            count: 2,
            header: '',
            tpl: '{{{safestring highlighted}}}',
          },
          promotedSuggestions: {
            count: 3,
            tpl: '{{{safestring highlighted}}}',
          },
          suggestionsHeader: '',
          popularProducts: {
            count: 2,
            price: !0,
            priceFunctionOrKey: 'price',
            name: !0,
            nameFunctionOrKey: 'title',
            salePrice: !1,
            salePriceKey: '',
            image: !0,
            imageUrlOrFunction: 'imageUrl',
            currency: 'Rs.',
            header: '',
            view: 'list',
            tpl: [
              '{{#if ../showCarts}}',
              '{{#unbxdIf ../../cartType "inline"}}',
              '<div class="unbxd-as-popular-product-inlinecart">',
              '<div class="unbxd-as-popular-product-image-container">',
              '{{#if image}}',
              '<img src="{{image}}" alt="{{autosuggest}}"/>',
              '{{/if}}',
              '</div>',
              '<div  class="unbxd-as-popular-product-name popular-title">',
              '<div style="table-layout:fixed;width:100%;display:table;">',
              '<div style="display:table-row">',
              '<div style="display:table-cell;text-overflow:ellipsis;overflow: hidden;white-space: nowrap;">',
              '{{{safestring highlighted}}}',
              '</div>',
              '</div>',
              '</div>',
              '</div>',
              '{{#if price}}',
              '<div class="unbxd-as-popular-product-price">',
              '{{#if salePrice}}',
              '<span class="regular-price">',
              '{{currency}}{{price}}',
              '</span>',
              '<span class="unbxd-as-discount">',
              '{{currency}}{{salePrice}}',
              '</span>',
              '{{else}}',
              '{{currency}}{{price}}',
              '{{/if}}',
              '</div>',
              '{{/if}}',
              '<div class="unbxd-as-popular-product-quantity">',
              '<div class="unbxd-as-popular-product-quantity-container">',
              '<span>Qty</span>',
              '<input class="unbxd-popular-product-qty-input" value="1"/>',
              '</div>',
              '</div>',
              '<div class="unbxd-as-popular-product-cart-action">',
              '<button class="unbxd-as-popular-product-cart-button">Add to cart</button>',
              '</div>',
              '</div>',
              '{{else}}',
              '<div class="unbxd-as-popular-product-info">',
              '<div class="unbxd-as-popular-product-image-container">',
              '{{#if image}}',
              '<img src="{{image}}" alt="{{autosuggest}}"/>',
              '{{/if}}',
              '</div>',
              '<div>',
              '<div  class="unbxd-as-popular-product-name popular-title">',
              '{{{safestring highlighted}}}',
              '</div>',
              '<div class="unbxd-as-popular-product-cart">',
              '<div class="unbxd-as-popular-product-cart-action">',
              '<button class="unbxd-as-popular-product-cart-button">Add to cart</button>',
              '</div>',
              '<div class="unbxd-as-popular-product-quantity">',
              '<div class="unbxd-as-popular-product-quantity-container">',
              '<span>Qty</span>',
              '<input class="unbxd-popular-product-qty-input" value="1"/>',
              '</div>',
              '</div>',
              '{{#if price}}',
              '<div class="unbxd-as-popular-product-price">',
              '{{#if salePrice}}',
              '<span class="regular-price">',
              '{{currency}}{{price}}',
              '</span>',
              '<span class="unbxd-as-discount">',
              '{{currency}}{{salePrice}}',
              '</span>',
              '{{else}}',
              '{{currency}}{{price}}',
              '{{/if}}',
              '</div>',
              '{{/if}}',
              '</div>',
              '</div>',
              '</div>',
              '{{/unbxdIf}}',
              '{{else}}',
              '<div class="unbxd-as-popular-product-info">',
              '<div class="unbxd-as-popular-product-image-container">',
              '{{#if image}}',
              '<img src="{{image}}" alt="{{autosuggest}}"/>',
              '{{/if}}',
              '</div>',
              '<div  class="unbxd-as-popular-product-name popular-title">',
              '{{{safestring highlighted}}}',
              '</div>',
              '{{#if price}}',
              '<div class="unbxd-as-popular-product-price">',
              '{{#if salePrice}}',
              '<span class="regular-price">',
              '{{currency}}{{price}}',
              '</span>',
              '<span class="unbxd-as-discount">',
              '{{currency}}{{salePrice}}',
              '</span>',
              '{{else}}',
              '{{currency}}{{price}}',
              '{{/if}}',
              '</div>',
              '{{/if}}',
              '</div>',
              '{{/if}}',
            ].join(''),
            viewMore: { enabled: !1, tpl: '', redirect: function () {} },
          },
          removeDuplicates: !1,
          filtered: !1,
          preferInputWidthTotalContent: !1,
          platform: 'com',
          sortedSuggestions: { tpl: '{{{safestring highlighted}}}' },
          removeOnBackButton: !1,
          resultsContainerSelector: null,
          processResultsStyles: null,
          inputContainerSelector: '',
          getProductsInfo: function (t) {
            return t.productInfo
          },
          searchEndPoint: '//search.unbxd.io',
        },
        productInfo: {},
        $input: null,
        $results: null,
        timeout: null,
        previous: '',
        activeRow: -1,
        activeColumn: 0,
        keyb: !1,
        compiledPopularProductHeader: '',
        hasFocus: !1,
        lastKeyPressCode: null,
        ajaxCall: null,
        currentResults: [],
        currentTopResults: [],
        cache: {},
        params: { query: '*', filters: {} },
        preferOneColumnFullWidth: !1,
        selectedClass: 'unbxd-ac-selected',
        scrollbarWidth: null,
        getPopularProductsHeader: function (t) {
          var s = t.options.popularProducts.header,
            e = ''
          return (
            'string' == typeof s
              ? (e = s)
              : 'function' == typeof s && (e = s(t)),
            e
          )
        },
        init: function (t, s) {
          var o
          ;(this.options = c.extend({}, this.default_options, s)),
            this.setDefaultPopularProductsOptions(),
            this.setDefaultOptions(),
            this.getPopularProductFields(),
            (this.$input = c(t).attr('autocomplete', 'off')),
            (this.$results = c('<div/>', {
              class:
                this.options.resultsClass + ' unbxd-as-overall-autosuggest',
            })
              .css(
                'position',
                'relative' === this.options.position
                  ? 'absolute'
                  : this.options.position
              )
              .hide()),
            0 < this.options.zIndex &&
              this.$results.css('zIndex', this.options.zIndex),
            ('string' == typeof this.options.resultsContainerSelector &&
            this.options.resultsContainerSelector.length
              ? c(this.options.resultsContainerSelector)
              : c('body')
            ).append(this.$results),
            'function' == typeof this.options.hbsHelpers &&
              this.options.hbsHelpers.call(this),
            this.options.trendingSearches.enabled &&
              ((this.trendingQueries = []),
              (t =
                (this.options.searchEndPoint
                  ? this.options.searchEndPoint + '/'
                  : 'https://search.unbxd.io/') +
                this.options.APIKey +
                '/' +
                this.options.siteName +
                '/autosuggest?trending-queries=true&q=*'),
              (o = this),
              c
                .ajax({ url: t, method: 'GET' })
                .done(function (t) {
                  if (
                    t &&
                    t.response.products &&
                    0 < t.response.products.length
                  ) {
                    var s = t.response.products.splice(
                      0,
                      o.options.trendingSearches.maxCount
                    )
                    o.clickResults.TRENDING_QUERIES = s
                    for (var e = 0; e < s.length; e++) {
                      var i = s[e]
                      o.processTrendingQueries(i)
                    }
                    o.$results.html('')
                    t = u.compile(o.prepareTrendingQueriesHTML())
                    o.$results.html(t({ data1: o.trendingQueries }))
                  }
                })
                .fail(function (t) {
                  console.log('error', t)
                })),
            this.wire()
        },
        wire: function () {
          var r = this
          this.$input.bind('keydown.auto', this.keyevents()),
            this.$input.bind('select.auto', function () {
              r.log('select : setting focus'), (r.hasFocus = !0)
            }),
            c('.unbxd-as-wrapper').on(
              'mouseover',
              'ul.unbxd-as-maincontent',
              function (t) {
                var s, e, i, o, n
                c.contains(r.$results[0], t.target) &&
                  r.options.filtered &&
                  (c('.' + r.selectedClass).removeClass(r.selectedClass),
                  c(t.target).addClass(r.selectedClass),
                  (s = o = c(t.target)),
                  (r.hasFocus = !1),
                  'LI' !== t.target.tagName && (s = o.parents('li')),
                  (e = c(s).attr('data-value') ? c(s).attr('data-value') : ''),
                  (i = c(s).attr('data-filtername')
                    ? c(s).attr('data-filtername')
                    : ''),
                  (o = c(s).attr('data-filtervalue')
                    ? c(s).attr('data-filtervalue')
                    : ''),
                  !s ||
                    s.hasClass('unbxd-as-header') ||
                    s.hasClass('unbxd-as-popular-product') ||
                    s.hasClass('topproducts') ||
                    'INPUT' === t.target.tagName ||
                    (e &&
                      ((o = e + ('' != i ? ':' + i + ':' + o : '')),
                      r.options.filtered &&
                        ((n = r.getPopularProductsHeader(r)),
                        (n = u.compile(n)),
                        (r.compiledPopularProductHeader = n({
                          hoverSuggestion: e,
                        }))),
                      (n = ''),
                      (n =
                        r.options.popularProducts.viewMore &&
                        r.options.popularProducts.viewMore.enabled
                          ? (('1column' === r.options.template
                              ? c('.unbxd-as-maincontent')
                              : c('.unbxd-as-sidecontent')
                            ).addClass('unbxd-as-view-more'),
                            u.compile(
                              r.preparefilteredPopularProducts() +
                                r.options.popularProducts.viewMore.tpl
                            ))
                          : u.compile(r.preparefilteredPopularProducts())),
                      r.currentTopResults[o] &&
                      0 < r.currentTopResults[o].length
                        ? c('.unbxd-as-sidecontent').html(
                            n({
                              data: r.currentTopResults[o],
                              showCarts: r.options.showCarts,
                              cartType: r.options.cartType,
                            })
                          )
                        : c('.unbxd-as-sidecontent').html(
                            n({
                              data: r.currentResults.POPULAR_PRODUCTS,
                              showCarts: r.options.showCarts,
                              cartType: r.options.cartType,
                            })
                          ),
                      (r.hoveredQuery = e)),
                    'grid' === r.options.popularProducts.view &&
                      r.options.popularProducts.rowCount &&
                      c('.unbxd-as-sidecontent')
                        .find('li.unbxd-as-popular-product-grid')
                        .css(
                          'width',
                          100 / r.options.popularProducts.rowCount + '%'
                        )))
              }
            ),
            c(window).bind('resize', function () {
              r.options.hideOnResize && r.hideResults()
            }),
            window.addEventListener('popstate', function (t) {
              r.options.removeOnBackButton && c('.unbxd-as-wrapper').hide()
            }),
            c(document).bind('click.auto', function (t) {
              if (t.target == r.input)
                r.log('clicked on input : focused'),
                  (r.hasFocus = !0),
                  r.previous === r.$input.val() &&
                    (r.$results.find('.unbxd-as-trending').length ||
                      ((r.$results.find('.unbxd-as-maincontent').length ||
                        r.$results.find('.unbxd-as-sidecontent').length) &&
                        r.$results.html(r.prepareHTML())),
                    r.showResults())
              else if (t.target == r.$results[0])
                r.log('clicked on results block : selecting'), (r.hasFocus = !1)
              else if (c(t.target).hasClass('unbxd-as-view-more'))
                r.options.popularProducts.viewMore.redirect(
                  r.hoveredQuery || r.$input.val()
                )
              else if (c.contains(r.$results[0], t.target)) {
                r.log('clicked on element for selection', t.target.tagName)
                var s = c(t.target),
                  e = s
                if (
                  ((r.hasFocus = !1),
                  (e = 'LI' !== t.target.tagName ? s.parents('li') : e) &&
                    !e.hasClass('.unbxd-as-header') &&
                    'INPUT' != t.target.tagName)
                ) {
                  if (
                    'BUTTON' == t.target.tagName &&
                    s.hasClass('unbxd-as-popular-product-cart-button') &&
                    'function' == typeof r.options.onCartClick
                  ) {
                    r.log('BUTTON click')
                    s = e.data()
                    return (
                      (s.quantity = parseFloat(
                        e.find('input.unbxd-popular-product-qty-input').val()
                      )),
                      r.addToAnalytics('click', {
                        pr: parseInt(s.index) + 1,
                        pid: s.pid || null,
                        url: window.location.href,
                      }),
                      r.options.onCartClick.call(
                        r,
                        s,
                        r.currentResults.POPULAR_PRODUCTS[parseInt(s.index)]
                          ._original
                      ) && r.hideResults(),
                      void r.addToAnalytics('addToCart', {
                        pid: s.pid || null,
                        url: window.location.href,
                      })
                    )
                  }
                  r.selectItem(e.data(), t)
                }
              } else (r.hasFocus = !1), r.hideResults()
            }),
            r.options.trendingSearches.enabled &&
              r.clickResults.TRENDING_QUERIES.length &&
              c(document).bind('keyup.auto', function (t) {
                '' === t.target.value &&
                  (r.$results.html(''),
                  (t = u.compile(r.prepareTrendingQueriesHTML())),
                  r.$results.html(t({ data1: r.trendingQueries })),
                  r.showResults())
              })
        },
        keyevents: function () {
          var s = this
          if (!e || !e.selfServe)
            return function (t) {
              switch (
                ((s.lastKeyPressCode = t.keyCode), (s.lastKeyEvent = t).keyCode)
              ) {
                case 38:
                  t.preventDefault(), s.moveSelect(-1)
                  break
                case 40:
                  t.preventDefault(), s.moveSelect(1)
                  break
                case 39:
                  ;-1 < s.activeRow && (t.preventDefault(), s.moveSide(1))
                  break
                case 37:
                  ;-1 < s.activeRow && (t.preventDefault(), s.moveSide(-1))
                  break
                case 9:
                case 13:
                  s.selectCurrent(t) ? t.preventDefault() : s.hideResultsNow()
                  break
                default:
                  ;(s.activeRow = -1),
                    (s.hasFocus = !0),
                    s.timeout && clearTimeout(s.timeout),
                    (s.timeout = setTimeout(
                      ((i = function () {
                        s.onChange()
                      }),
                      (o = 250),
                      function () {
                        var t = this,
                          s = arguments,
                          e = n && !r
                        clearTimeout(r),
                          (r = setTimeout(function () {
                            ;(r = null), n || i.apply(t, s)
                          }, o)),
                          e && i.apply(t, s)
                      }),
                      s.options.delay
                    ))
              }
              var i, o, n, r
            }
          s.onChange()
        },
        moveSide: function (t) {
          var s = this.activeColumn
          '2column' == this.options.template &&
            ('left' == this.options.sideContentOn
              ? (0 == this.activeColumn && -1 == t && (s = 1),
                1 == this.activeColumn && 1 == t && (s = 0))
              : (0 == this.activeColumn && 1 == t && (s = 1),
                1 == this.activeColumn && -1 == t && (s = 0)),
            s != this.activeColumn &&
              ((this.activeColumn = s),
              (this.activeRow = -1),
              this.moveSelect(1)))
        },
        moveSelect: function (t) {
          var s,
            e = this.$results
              .find(
                'ul.' +
                  (this.activeColumn
                    ? 'unbxd-as-sidecontent'
                    : 'unbxd-as-maincontent')
              )
              .find('li:not(.unbxd-as-header)')
          e &&
            ((this.activeRow += t),
            this.activeRow < -1
              ? (this.activeRow =
                  ('function' == typeof e.size ? e.size() : e.length) - 1)
              : -1 == this.activeRow
              ? this.$input.focus()
              : this.activeRow >=
                  ('function' == typeof e.size ? e.size() : e.length) &&
                ((this.activeRow = -1), this.$input.focus()),
            c('.' + this.selectedClass).removeClass(this.selectedClass),
            c(e[this.activeRow]).addClass(this.selectedClass),
            0 <= this.activeRow &&
            this.activeRow < ('function' == typeof e.size ? e.size() : e.length)
              ? (this.$input.val(c(e[this.activeRow]).data('value')),
                this.options.filtered &&
                  0 === this.activeColumn &&
                  ((s = c(e[this.activeRow]).attr('data-value')
                    ? c(e[this.activeRow]).attr('data-value')
                    : ''),
                  (t = c(e[this.activeRow]).attr('data-filtername')
                    ? c(e[this.activeRow]).attr('data-filtername')
                    : ''),
                  (e = c(e[this.activeRow]).attr('data-filtervalue')
                    ? c(e[this.activeRow]).attr('data-filtervalue')
                    : ''),
                  (t = s + ('' != t ? ':' + t + ':' + e : '')),
                  this.options.filtered &&
                    ((e = this.getPopularProductsHeader(this)),
                    (e = u.compile(e)),
                    (this.compiledPopularProductHeader = e({
                      hoverSuggestion: s,
                    }))),
                  (s = ''),
                  (s =
                    this.options.popularProducts.viewMore &&
                    this.options.popularProducts.viewMore.enabled
                      ? (c('.unbxd-as-sidecontent').addClass(
                          'unbxd-as-view-more'
                        ),
                        u.compile(
                          this.preparefilteredPopularProducts() +
                            this.options.popularProducts.viewMore.tpl
                        ))
                      : u.compile(this.preparefilteredPopularProducts())),
                  this.currentTopResults[t] &&
                  0 < this.currentTopResults[t].length
                    ? c('.unbxd-as-sidecontent').html(
                        s({
                          data: this.currentTopResults[t],
                          showCarts: this.options.showCarts,
                          cartType: this.options.cartType,
                        })
                      )
                    : c('.unbxd-as-sidecontent').html(
                        s({
                          data: this.currentResults.POPULAR_PRODUCTS,
                          showCarts: this.options.showCarts,
                          cartType: this.options.cartType,
                        })
                      ),
                  'grid' === this.options.popularProducts.view &&
                    this.options.popularProducts.rowCount &&
                    this.$results
                      .find('ul li.unbxd-as-popular-product-grid')
                      .css(
                        'width',
                        100 / this.options.popularProducts.rowCount + '%'
                      )))
              : -1 == this.activeRow &&
                (this.$input.val(this.previous),
                this.options.filtered &&
                  ((s = ''),
                  (s =
                    this.options.popularProducts.viewMore &&
                    this.options.popularProducts.viewMore.enabled
                      ? (c('.unbxd-as-sidecontent').addClass(
                          'unbxd-as-view-more'
                        ),
                        u.compile(
                          this.preparefilteredPopularProducts() +
                            this.options.popularProducts.viewMore.tpl
                        ))
                      : u.compile(this.preparefilteredPopularProducts())),
                  this.currentTopResults[this.previous] &&
                  0 < this.currentTopResults[this.previous].length
                    ? c('.unbxd-as-sidecontent').html(
                        s({
                          data: this.currentTopResults[this.previous],
                          showCarts: this.options.showCarts,
                          cartType: this.options.cartType,
                        })
                      )
                    : c('.unbxd-as-sidecontent').html(
                        s({
                          data: this.currentResults.POPULAR_PRODUCTS,
                          showCarts: this.options.showCarts,
                          cartType: this.options.cartType,
                        })
                      ),
                  'grid' === this.options.popularProducts.view &&
                    this.options.popularProducts.rowCount &&
                    this.$results
                      .find('ul li.unbxd-as-popular-product-grid')
                      .css(
                        'width',
                        100 / this.options.popularProducts.rowCount + '%'
                      ))))
        },
        selectCurrent: function (t) {
          var s = this.$results.find('li.' + this.selectedClass)
          return s.length
            ? (this.selectItem(s.data(), t), !0)
            : ('function' != typeof this.options.onSimpleEnter ||
                (10 != this.lastKeyPressCode && 13 != this.lastKeyPressCode) ||
                (this.lastKeyEvent.preventDefault(),
                this.options.onSimpleEnter.call(this, t)),
              !1)
        },
        selectItem: function (t, s) {
          var e, i
          'value' in t &&
            (this.log('selected Item : ', t),
            (e = c.trim(t.value)),
            (i = this.previous),
            (this.previous = e),
            (this.input.lastSelected = t),
            this.$results.html(''),
            this.$input.val(e),
            this.hideResultsNow(this),
            this.addToAnalytics('search', {
              query: t.value,
              autosuggestParams: {
                autosuggest_type: t.type,
                autosuggest_suggestion: t.value,
                field_value: t.filtervalue || null,
                field_name: t.filtername || null,
                src_field: t.source || null,
                pid: t.pid || null,
                unbxdprank: parseInt(t.index, 10) + 1 || 0,
                internal_query: i,
              },
            }),
            'function' == typeof this.options.onItemSelect &&
            'POPULAR_PRODUCTS_FILTERED' !== t.type
              ? t.sorted
                ? this.options.onItemSelect.call(
                    this,
                    t,
                    this.currentResults.SORTED_SUGGESTIONS[parseInt(t.index)]
                      ._original,
                    s
                  )
                : this.options.onItemSelect.call(
                    this,
                    t,
                    this.currentResults[t.type][parseInt(t.index)]._original,
                    s
                  )
              : 'POPULAR_PRODUCTS_FILTERED' === t.type &&
                this.options.onItemSelect.call(
                  this,
                  t,
                  this.currentTopResults[t.src][parseInt(t.index)]._original,
                  s
                ))
        },
        addToAnalytics: function (t, s) {
          'Unbxd' in window &&
            'track' in window.Unbxd &&
            'function' == typeof window.Unbxd.track &&
            (this.log('Pushing data to analytics', t, s), Unbxd.track(t, s)),
            'search' === t &&
              ('classical' in this.options.integrations &&
                this.trackclassical(t, s),
              'universal' in this.options.integrations &&
                this.trackuniversal(t, s))
        },
        getEventAction: function (t) {
          return {
            IN_FIELD: 'Scope_Click',
            POPULAR_PRODUCTS: 'Pop_Click',
            KEYWORD_SUGGESTION: 'TQ_Click',
            TOP_SEARCH_QUERIES: 'TQ_Click',
            POPULAR_PRODUCTS_FILTERED: 'Filtered_Pop_Click',
            PROMOTED_SUGGESTION: 'TQ_Click',
          }[t]
        },
        getEventLabel: function (t) {
          var s = t.autosuggestParams,
            e = s.autosuggest_suggestion,
            i = s.unbxdprank,
            t =
              s.field_name && s.field_value
                ? s.field_name + ':' + s.field_value
                : void 0
          return {
            IN_FIELD: e + (t ? '&filter=' + t : '') + '-' + i,
            POPULAR_PRODUCTS: e + '-' + i,
            KEYWORD_SUGGESTION: e + '-' + i,
            TOP_SEARCH_QUERIES: e + '-' + i,
            POPULAR_PRODUCTS_FILTERED: e + '-' + i,
            PROMOTED_SUGGESTION: e + '-' + i,
          }[s.autosuggest_type]
        },
        trackclassical: function (t, s) {
          var e = this.options.integrations.classical,
            i = this.getEventAction(s.autosuggestParams.autosuggest_type),
            s = this.getEventLabel(s)
          e &&
            (!0 === e && (e = '_gaq'),
            window[e] &&
              window[e].push(['_trackEvent', 'U_Autocomplete', i, s, 1, !0]))
        },
        trackuniversal: function (t, s) {
          var e = this.options.integrations.universal,
            i = this.getEventAction(s.autosuggestParams.autosuggest_type),
            s = this.getEventLabel(s)
          e &&
            (!0 === e && (e = 'ga'),
            window[e] &&
              window[e]('send', 'event', 'U_Autocomplete', i, s, 1, {
                nonInteraction: 1,
              }))
        },
        showResults: function () {
          this.options.width && (this.options.mainWidth = this.options.width)
          var t = this.options.inputContainerSelector
              ? c(this.options.inputContainerSelector)
              : this.$input,
            s = t.offset(),
            e = '',
            i = ''
          'io' == this.options.platform &&
            (788 <
              (e =
                (e = this.options.preferInputWidthTotalContent
                  ? t.outerWidth()
                  : this.options.sideContentOn &&
                    'left' === this.options.sideContentOn
                  ? s.left + t.outerWidth()
                  : document.body.clientWidth - s.left) >
                document.body.clientWidth
                  ? document.body.clientWidth
                  : e) && e < 2e3
              ? (e = this.options.totalWidthPercent
                  ? (this.options.totalWidthPercent * e) / 100
                  : (70 * e) / 100)
              : 2e3 < e && (e = (45 * e) / 100),
            (this.options.isMobile && this.options.isMobile()) || p.any()
              ? ((this.options.template = this.options.mobile.template),
                (this.options.mainTpl = this.options.mobile.mainTpl),
                (this.options.popularProducts.count =
                  this.options.mobile.popularProducts.count))
              : ((this.options.template = this.options.desktop.template.column),
                (this.options.mainTpl = this.options.desktop.mainTpl),
                (this.options.popularProducts.count =
                  this.options.desktop.popularProducts.count)),
            (i =
              '1column' == this.options.template
                ? ((a = this.options.preferInputWidthMainContent),
                  function () {
                    return !('function' == typeof this.options.isMobile
                      ? this.options.isMobile()
                      : p.any())
                  }.call(this) &&
                    ((a =
                      this.options.desktop.template[
                        this.options.desktop.template.column
                      ].preferInputWidthMainContent),
                    c('.unbxd-as-popular-product-info').addClass(
                      'unbxd-1column-popular-product-desktop'
                    )),
                  a ? t.outerWidth() : (60 * e) / 100)
                : this.options.mainWidthPercent
                ? (this.options.mainWidthPercent * e) / 100
                : (30 * e) / 100))
          var o =
              0 < this.options.mainWidth
                ? this.options.mainWidth
                : e
                ? i
                : t.innerWidth(),
            n = parseInt(t.css('border-top-width'), 10),
            r = parseInt(t.css('border-bottom-width'), 10),
            a = parseInt(t.css('border-left-width'), 10),
            i = parseInt(t.css('border-right-width'), 10),
            i =
              (parseInt(t.css('padding-bottom'), 10), parseInt(o) - 2 + a + i),
            n = {
              top: s.top + (isNaN(n) ? 0 : n + r) + t.innerHeight() + 'px',
              left: s.left + 'px',
            },
            r = this.options.trendingSearches.preferInputWidthTrending
              ? t.outerWidth()
              : i
          this.$results.find('ul.unbxd-as-maincontent').css('width', i + 'px'),
            this.$results
              .find('ul.unbxd-as-maincontent')
              .css('box-sizing', 'border-box'),
            this.$results
              .find('ul.unbxd-as-maincontent.unbxd-as-trending')
              .css('width', r + 'px'),
            null == this.scrollbarWidth && this.setScrollWidth(),
            '2column' == this.options.template &&
              ((e =
                this.options.sideWidth === this.default_options.sideWidth && e
                  ? e - i
                  : this.options.sideWidth),
              this.$results
                .find('ul.unbxd-as-sidecontent')
                .css('width', e + 'px'),
              this.$results
                .find('ul.unbxd-as-sidecontent')
                .css('box-sizing', 'border-box'),
              this.$results.removeClass(
                'unbxd-as-extra-left unbxd-as-extra-right'
              ),
              this.$results.addClass(
                'unbxd-as-extra-' + this.options.sideContentOn
              ),
              0 < this.$results.find('ul.unbxd-as-sidecontent').length &&
                'left' == this.options.sideContentOn &&
                ((t =
                  s.left + t.outerWidth() > document.body.clientWidth
                    ? document.body.clientWidth
                    : s.left + t.outerWidth()),
                (n.left = t - i - e),
                n.left < 0 && (n.left = 0),
                0 == this.$results.find('ul.unbxd-as-maincontent').length &&
                  (n.left = n.left + i),
                (n.left = n.left + 'px')),
              'grid' === this.options.popularProducts.view &&
                this.options.popularProducts.rowCount &&
                this.$results
                  .find('ul li.unbxd-as-popular-product-grid')
                  .css(
                    'width',
                    100 / this.options.popularProducts.rowCount + '%'
                  )),
            this.options.showCarts &&
              this.$results
                .find('.unbxd-as-popular-product-cart-button')
                .css('background-color', this.options.theme),
            'function' == typeof this.options.processResultsStyles &&
              (n = this.options.processResultsStyles.call(this, n)),
            !$('body').hasClass('unbxd-body-overlay') &&
              1024 < screen.width &&
              $('body').addClass('unbxd-body-overlay'),
            this.$results.css(n).show()
        },
        setScrollWidth: function () {
          var t = document.createElement('div')
          t.setAttribute(
            'style',
            'width: 100px;height: 100px;overflow: scroll;position: absolute;top: -9999px;'
          ),
            document.body.appendChild(t),
            (this.scrollbarWidth = t.offsetWidth - t.clientWidth),
            document.body.removeChild(t)
        },
        hideResults: function () {
          this.timeout && clearTimeout(this.timeout)
          var t = this
          this.timeout = setTimeout(function () {
            t.hideResultsNow()
          }, 200)
        },
        hideResultsNow: function () {
          this.log('hideResultsNow'),
            this.timeout && clearTimeout(this.timeout),
            this.$input.removeClass(this.options.loadingClass),
            this.$results.is(':visible') &&
              (this.$results.hide(),
              $('body').removeClass('unbxd-body-overlay')),
            this.ajaxCall && this.ajaxCall.abort()
        },
        addFilter: function (t, s) {
          return (
            t in this.params.filters || (this.params.filters[t] = {}),
            (this.params.filters[t][s] = t),
            this
          )
        },
        removeFilter: function (t, s) {
          return (
            s in this.params.filters[t] && delete this.params.filters[t][s],
            0 == Object.keys(this.params.filters[t]).length &&
              delete this.params.filters[t],
            this
          )
        },
        clearFilters: function () {
          return (this.params.filters = {}), this
        },
        onChange: function () {
          if (
            46 == this.lastKeyPressCode ||
            (8 < this.lastKeyPressCode && this.lastKeyPressCode < 32)
          )
            return (
              27 == this.lastKeyPressCode &&
                'object' == typeof this.input.lastSelected &&
                this.$input.val(this.input.lastSelected.value),
              $('body').hasClass('unbxd-body-overlay') &&
                1024 < screen.width &&
                $('body').removeClass('unbxd-body-overlay'),
              this.$results.hide()
            )
          0 == this.$input.val().length &&
            $('body').hasClass('unbxd-body-overlay') &&
            1024 < screen.width &&
            $('body').removeClass('unbxd-body-overlay')
          var t,
            s = ''
          ;(s = e && e.selfServe ? '*' : this.$input.val()) != this.previous &&
            ((this.params.q = s),
            (this.previous = s),
            (this.currentResults = {
              KEYWORD_SUGGESTION: [],
              TOP_SEARCH_QUERIES: [],
              POPULAR_PRODUCTS: [],
              IN_FIELD: [],
              SORTED_SUGGESTIONS: [],
              PROMOTED_SUGGESTION: [],
            }),
            this.inCache(s)
              ? (this.log('picked from cache : ' + s),
                (this.currentResults = this.getFromCache(s)),
                (this.productInfo.popularProductsCount =
                  this.currentResults.POPULAR_PRODUCTS.length),
                this.options.filtered &&
                  ((t = this.getPopularProductsHeader(this)),
                  (t = u.compile(t)),
                  (this.compiledPopularProductHeader = t({
                    hoverSuggestion: s,
                  }))),
                this.$results.html(this.prepareHTML()),
                this.showResults())
              : (this.ajaxCall && this.ajaxCall.abort(),
                s.length >= this.options.minChars
                  ? (this.$input.addClass(this.options.loadingClass),
                    this.requestData(s))
                  : (this.$input.removeClass(this.options.loadingClass),
                    (this.options.trendingSearches.enabled &&
                      0 < this.clickResults.TRENDING_QUERIES.length &&
                      '' === s) ||
                      this.$results.hide())))
        },
        getClass: function (t) {
          return Object.prototype.toString
            .call(t)
            .match(/^\[object\s(.*)\]$/)[1]
        },
        requestData: function (t) {
          var s = this,
            e = s.autosuggestUrl()
          this.log('requestData', e)
          var i = this.getAjaxParams()
          ;(i.url = e),
            (i.cache = !0),
            (this.ajaxCall = c
              .ajax(i)
              .done(function (t) {
                s.receiveData(t)
              })
              .fail(function (t) {
                s.$input.removeClass(s.options.loadingClass), s.$results.hide()
              }))
        },
        getHostDomainName: function () {
          return 'com' === this.options.platform
            ? '//search.unbxdapi.com/'
            : this.options.searchEndPoint + '/'
        },
        getAjaxParams: function () {
          return 'io' === this.options.platform
            ? { dataType: 'json', method: 'get' }
            : { dataType: 'jsonp', jsonp: 'json.wrf' }
        },
        autosuggestUrl: function () {
          var t = this.getHostNPath(),
            s = this.params.q
          this.options.customQueryParse &&
            'function' == typeof this.options.customQueryParse &&
            (s = this.options.customQueryParse(this.params.q))
          var e,
            i = 'q=' + encodeURIComponent(s)
          for (e in (this.options.maxSuggestions
            ? (i +=
                '&inFields.count=' +
                this.options.maxSuggestions +
                '&topQueries.count=' +
                this.options.maxSuggestions +
                '&keywordSuggestions.count=' +
                this.options.maxSuggestions +
                '&popularProducts.count=' +
                this.options.popularProducts.count +
                '&promotedSuggestion.count=' +
                this.options.maxSuggestions +
                '&indent=off')
            : (i +=
                '&inFields.count=' +
                this.options.inFields.count +
                '&topQueries.count=' +
                this.options.topQueries.count +
                '&keywordSuggestions.count=' +
                this.options.keywordSuggestions.count +
                '&popularProducts.count=' +
                this.options.popularProducts.count +
                '&promotedSuggestion.count=' +
                this.options.promotedSuggestions.count +
                '&indent=off'),
          0 < this.options.popularProducts.fields.length &&
            ((a = this.options.popularProducts.fields.join(',')),
            (i = i + '&popularProducts.fields=' + a)),
          this.options.removeDuplicates && (i += '&variants=true'),
          this.params.filters))
            if (this.params.filters.hasOwnProperty(e)) {
              var o,
                n = []
              for (o in this.params.filters[e])
                this.params.filters[e].hasOwnProperty(o) &&
                  n.push(
                    (
                      e +
                      ':"' +
                      encodeURIComponent(o.replace(/(^")|("$)/g, '')) +
                      '"'
                    ).replace(/\"{2,}/g, '"')
                  )
              i += '&filter=' + n.join(' OR ')
            }
          var r = this.options.extraParams || {},
            a = Object.keys(r)
          return (
            a.length &&
              a.forEach((t) => {
                i = i + '&' + t + '=' + r[t]
              }),
            t + '?' + i
          )
        },
        getHostNPath: function () {
          return (
            this.getHostDomainName() +
            this.options.APIKey +
            '/' +
            this.options.siteName +
            '/autosuggest'
          )
        },
        receiveData: function (t) {
          if (t) {
            if (
              (this.$input.removeClass(this.options.loadingClass),
              this.$results.html(''),
              ((!this.hasFocus && (!e || !e.selfServe)) ||
                0 == t.response.numberOfProducts ||
                'error' in t) &&
                !this.options.noResultTpl)
            )
              return this.hideResultsNow(this)
            this.processData(t),
              this.addToCache(this.params.q, this.currentResults),
              this.$results.html(this.prepareHTML()),
              this.showResults()
          } else this.hideResultsNow(this)
        },
        max_suggest: function (t) {
          for (
            var s = 0,
              e = 0,
              i = 0,
              o = 0,
              n = Math.floor(0.2 * this.options.maxSuggestions),
              r = Math.floor(0.3 * this.options.maxSuggestions),
              a = Math.ceil(0.3 * this.options.maxSuggestions),
              u = Math.floor(0.2 * this.options.maxSuggestions),
              l = 0,
              p = 0,
              d = 0,
              c = 0;
            c < t.response.products.length;
            c++
          )
            'IN_FIELD' == t.response.products[c].doctype
              ? s++
              : 'KEYWORD_SUGGESTION' == t.response.products[c].doctype
              ? i++
              : 'TOP_SEARCH_QUERIES' == t.response.products[c].doctype
              ? e++
              : 'PROMOTED_SUGGESTION' == t.response.products[c].doctype && o++
          if (s < n) {
            for (var h = n - s; 0 < h; )
              r < i
                ? h <= i - r
                  ? ((r += h), (h = 0))
                  : ((h = h - i + r), (r = i))
                : a < e
                ? h <= e - a
                  ? ((a += h), (h = 0))
                  : ((h = h - e + a), (a = e))
                : u < o
                ? h <= o - u
                  ? ((u += h), (h = 0))
                  : ((h = h - o + u), (u = o))
                : (h = 0)
            n = s
          }
          if (e < a) {
            for (p = a - e; 0 < p && r < i; )
              r < i
                ? p <= i - r
                  ? ((r += p), (p = 0))
                  : ((p = p - i + r), (r = i))
                : u < o &&
                  (p <= o - u
                    ? ((u += p), (p = 0))
                    : ((p = p - o + u), (u = o)))
            a = e
          }
          if (i < r) {
            for (l = r - i; 0 < l && a < e; )
              a < e
                ? l <= e - a
                  ? ((a += l), (l = 0))
                  : ((l = l - e + a), (a = e))
                : u < o &&
                  (l <= o - u
                    ? ((u += l), (l = 0))
                    : ((l = l - o + u), (u = o)))
            r = i
          }
          if (o < u) {
            for (d = u - o; 0 < d; )
              a < e
                ? d <= e - a
                  ? ((a += d), (d = 0))
                  : ((d = d - e + a), (a = e))
                : r < i
                ? d <= i - r
                  ? ((r += d), (d = 0))
                  : ((d = d - i + r), (r = i))
                : (d = 0)
            u = o
          }
          var g = {}
          return (
            (g.infields = n),
            (g.topquery = a),
            (g.promoted = u),
            (g.keyword = r),
            (g.key_rem = l),
            (g.top_rem = p),
            (g.promo_rem = d),
            g
          )
        },
        isUnique: function (t, s) {
          try {
            t = t.toLowerCase()
            for (var e = !0, i = 0; i < s.length; i++) {
              var o = s[i]
              if (
                Math.abs(o.length - t.length) < 3 &&
                (-1 != o.indexOf(t) || -1 != t.indexOf(o))
              ) {
                e = !1
                break
              }
            }
            return e && s.push(t), e
          } catch (t) {
            return !0
          }
        },
        isTempUnique: function (t, s) {
          return (t = t.toLowerCase()), -1 === s.indexOf(t) && s.push(t)
        },
        getfilteredPopularProducts: function () {
          var t = this.params.q
          this.options.customQueryParse &&
            'function' == typeof this.options.customQueryParse &&
            (t = this.options.customQueryParse(this.params.q))
          var s,
            e = this,
            i =
              this.getHostDomainName() +
              this.options.APIKey +
              '/' +
              this.options.siteName +
              '/search',
            o = 'indent=off&facet=off&analytics=false&redirect=false',
            n =
              i +
              '?q=' +
              encodeURIComponent(t) +
              '&rows=' +
              this.options.popularProducts.count +
              '&' +
              o
          0 < e.options.popularProducts.fields.length &&
            ((s = '&fields=' + e.options.popularProducts.fields.join(',')),
            (n += s)),
            e.options.removeDuplicates && (n += '&variants=true')
          var r = e.options.extraParams || {},
            t = Object.keys(r)
          t.length &&
            t.forEach((t) => {
              n = n + '&' + t + '=' + r[t]
            })
          var a,
            u = this.getAjaxParams()
          for (a in ((u.url = n),
          (u.cache = !0),
          c.ajax(u).done(function (t) {
            var s = e.params.q
            e.processfilteredPopularProducts(s, t)
          }),
          this.currentResults))
            if (
              'POPULAR_PRODUCTS' != a &&
              this.currentResults.hasOwnProperty(a)
            )
              for (var l in this.currentResults[a])
                this.currentResults[a].hasOwnProperty(l) &&
                  ((n = this.currentResults[a][l].filtername
                    ? i +
                      '?q=' +
                      encodeURIComponent(
                        this.currentResults[a][l].autosuggest
                      ) +
                      '&filter=' +
                      this.currentResults[a][l].filtername +
                      ':"' +
                      encodeURIComponent(
                        this.currentResults[a][l].filtervalue
                      ) +
                      '"&rows=' +
                      this.options.popularProducts.count +
                      s +
                      '&' +
                      o
                    : i +
                      '?q=' +
                      encodeURIComponent(
                        this.currentResults[a][l].autosuggest
                      ) +
                      '&rows=' +
                      this.options.popularProducts.count +
                      s +
                      '&' +
                      o),
                  ((u = this.getAjaxParams()).url = n),
                  (u.cache = !0),
                  c.ajax(u).done(function (t) {
                    var s =
                      t.searchMetaData.queryParams.q +
                      (t.searchMetaData.queryParams.filter
                        ? ':' +
                          t.searchMetaData.queryParams.filter.replace(/"/g, '')
                        : '')
                    e.processfilteredPopularProducts(s, t)
                  }))
        },
        processfilteredPopularProducts: function (t, s) {
          if (
            ((this.currentTopResults[t] = []),
            s.hasOwnProperty('response') &&
              s.response.hasOwnProperty('products') &&
              s.response.products.length)
          )
            for (var e = 0; e < s.response.products.length; e++) {
              var i = s.response.products[e],
                o = {
                  _original: i,
                  type: 'POPULAR_PRODUCTS_FILTERED',
                  src: t,
                  pid: i.uniqueId || '',
                }
              this.options.popularProducts.name &&
              this.options.popularProducts.nameFunctionOrKey
                ? (o.autosuggest =
                    i[this.options.popularProducts.nameFunctionOrKey])
                : this.options.popularProducts.autosuggestName &&
                  i[this.options.popularProducts.autosuggestName]
                ? (o.autosuggest =
                    i[this.options.popularProducts.autosuggestName])
                : this.options.popularProducts.title &&
                  i[this.options.popularProducts.title]
                ? (o.autosuggest = i[this.options.popularProducts.title])
                : i.title
                ? (o.autosuggest = i.title)
                : (o.autosuggest = ''),
                (o.highlighted = this.highlightStr(o.autosuggest)),
                this.options.popularProducts.price &&
                  ('function' ==
                  typeof this.options.popularProducts.priceFunctionOrKey
                    ? (o.price =
                        this.options.popularProducts.priceFunctionOrKey(i))
                    : 'string' ==
                        typeof this.options.popularProducts
                          .priceFunctionOrKey &&
                      this.options.popularProducts.priceFunctionOrKey
                    ? (o.price =
                        this.options.popularProducts.priceFunctionOrKey in i
                          ? i[this.options.popularProducts.priceFunctionOrKey]
                          : null)
                    : (o.price = 'price' in i ? i.price : null),
                  this.options.popularProducts.currency &&
                    (o.currency = this.options.popularProducts.currency)),
                this.options.popularProducts.salePrice &&
                  this.options.popularProducts.salePriceKey &&
                  (o.salePrice =
                    this.options.popularProducts.salePriceKey in i
                      ? i[this.options.popularProducts.salePriceKey]
                      : null),
                this.options.popularProducts.image &&
                  ('function' ==
                  typeof this.options.popularProducts.imageUrlOrFunction
                    ? (o.image =
                        this.options.popularProducts.imageUrlOrFunction(i))
                    : 'string' ==
                        typeof this.options.popularProducts
                          .imageUrlOrFunction &&
                      this.options.popularProducts.imageUrlOrFunction &&
                      (o.image =
                        this.options.popularProducts.imageUrlOrFunction in i
                          ? i[this.options.popularProducts.imageUrlOrFunction]
                          : null)),
                this.currentTopResults[t].push(o)
            }
        },
        processTopSearchQuery: function (t) {
          t = {
            autosuggest: t.autosuggest,
            highlighted: this.highlightStr(t.autosuggest),
            type: 'TOP_SEARCH_QUERIES',
            _original: t.doctype,
          }
          this.currentResults.TOP_SEARCH_QUERIES.push(t)
        },
        processTrendingQueries: function (t) {
          t = {
            autosuggest: t.autosuggest,
            highlighted: this.highlightStr(t.autosuggest),
            type: 'TRENDING_QUERIES',
            _original: t,
            source: t.unbxdAutosuggestSrc || '',
          }
          this.trendingQueries.push(t)
        },
        processKeywordSuggestion: function (t) {
          t = {
            autosuggest: t.autosuggest,
            highlighted: this.highlightStr(t.autosuggest),
            type: 'KEYWORD_SUGGESTION',
            _original: t,
            source: t.unbxdAutosuggestSrc || '',
          }
          this.currentResults.KEYWORD_SUGGESTION.push(t)
        },
        processPromotedSuggestion: function (t) {
          t = {
            autosuggest: t.autosuggest,
            highlighted: this.highlightStr(t.autosuggest),
            type: 'PROMOTED_SUGGESTION',
            _original: t,
            source: t.unbxdAutosuggestSrc || '',
          }
          this.currentResults.PROMOTED_SUGGESTION.push(t)
        },
        setDefaultPopularProductsOptions: function () {
          this.options.popularProducts.autosuggestName ||
            (this.options.popularProducts.autosuggestName = 'title'),
            this.options.popularProducts.title ||
              (this.options.popularProducts.title = 'autosuggest'),
            this.options.popularProducts.fields ||
              (this.options.popularProducts.fields = []),
            this.options.popularProducts.rowCount ||
              'io' !== this.options.platform ||
              (this.options.popularProducts.rowCount =
                this.options.popularProducts.count / 2)
        },
        setDefaultOptions: function () {
          this.options.inFields.type ||
            (this.options.inFields.type = 'separate'),
            this.options.inFields.noOfInfields ||
              (this.options.inFields.noOfInfields = 3),
            this.options.inFields.showDefault ||
              (this.options.inFields.showDefault = !1),
            this.options.desktop ||
              (this.options.desktop = {
                template: {
                  column: this.options.template,
                  '1column': {
                    preferInputWidthMainContent:
                      this.options.preferOneColumnFullWidth,
                  },
                  '2column': {
                    preferInputWidthMainContent:
                      this.options.preferInputWidthMainContent,
                  },
                },
                mainTpl: this.options.mainTpl,
                popularProducts: { count: this.options.popularProducts.count },
              })
        },
        getPopularProductFields: function () {
          var t = ['doctype']
          this.options.popularProducts.fields.push(
            this.options.popularProducts.title
          ),
            this.options.popularProducts.price &&
              'string' ==
                typeof this.options.popularProducts.priceFunctionOrKey &&
              this.options.popularProducts.priceFunctionOrKey &&
              t.push(this.options.popularProducts.priceFunctionOrKey),
            this.options.popularProducts.image &&
              'string' ==
                typeof this.options.popularProducts.imageUrlOrFunction &&
              this.options.popularProducts.imageUrlOrFunction &&
              t.push(this.options.popularProducts.imageUrlOrFunction),
            0 < this.options.popularProducts.fields.length
              ? (this.options.popularProducts.fields = t.concat(
                  this.options.popularProducts.fields
                ))
              : (this.options.popularProducts.fields = t)
          t = this.getPopularProductsHeader(this)
          this.compiledPopularProductHeader = t
        },
        processPopularProducts: function (t) {
          var s = {
            type: t.doctype,
            pid: t.uniqueId.replace('popularProduct_', ''),
            _original: t,
          }
          this.options.popularProducts.name
            ? (s.autosuggest =
                t[this.options.popularProducts.nameFunctionOrKey] ||
                t[this.options.popularProducts.title] ||
                '')
            : (s.autosuggest = ''),
            (s.highlighted = this.highlightStr(s.autosuggest)),
            this.options.popularProducts.price &&
              ('function' ==
              typeof this.options.popularProducts.priceFunctionOrKey
                ? (s.price = this.options.popularProducts.priceFunctionOrKey(t))
                : 'string' ==
                    typeof this.options.popularProducts.priceFunctionOrKey &&
                  this.options.popularProducts.priceFunctionOrKey
                ? (s.price =
                    this.options.popularProducts.priceFunctionOrKey in t
                      ? t[this.options.popularProducts.priceFunctionOrKey]
                      : null)
                : (s.price = 'price' in t ? t.price : null)),
            this.options.popularProducts.salePrice &&
              this.options.popularProducts.salePriceKey &&
              (s.salePrice =
                this.options.popularProducts.salePriceKey in t
                  ? t[this.options.popularProducts.salePriceKey]
                  : null),
            this.options.popularProducts.currency &&
              (s.currency = this.options.popularProducts.currency),
            this.options.popularProducts.image &&
              ('function' ==
              typeof this.options.popularProducts.imageUrlOrFunction
                ? (s.image = this.options.popularProducts.imageUrlOrFunction(t))
                : 'string' ==
                    typeof this.options.popularProducts.imageUrlOrFunction &&
                  this.options.popularProducts.imageUrlOrFunction &&
                  (s.image =
                    this.options.popularProducts.imageUrlOrFunction in t
                      ? t[this.options.popularProducts.imageUrlOrFunction]
                      : null)),
            this.currentResults.POPULAR_PRODUCTS.push(s),
            (this.productInfo.popularProductsCount =
              this.currentResults.POPULAR_PRODUCTS.length),
            this.options.filtered &&
              ((s = this.getPopularProductsHeader(this)),
              (s = u.compile(s)),
              (this.compiledPopularProductHeader = s({
                hoverSuggestion: this.params.q,
              })))
        },
        processInFields: function (s) {
          var t,
            e = {},
            i = ' ' + s.unbxdAutosuggestSrc + ' ',
            o = this.highlightStr(s.autosuggest)
          if (this.options.inFields.showDefault) {
            var n = this
            Object.keys(s).forEach(function (t) {
              3 <= t.length &&
                '_in' === t.substring(t.length - 3) &&
                ((t = t.split('_in')[0]),
                (e[t] = s[t + '_in'].slice(
                  0,
                  parseInt(n.options.inFields.noOfInfields)
                )))
            })
          } else
            for (var r in this.options.inFields.fields)
              r + '_in' in s &&
                s[r + '_in'].length &&
                -1 == i.indexOf(' ' + r + ' ') &&
                ((e[r] = s[r + '_in'].slice(
                  0,
                  parseInt(this.options.inFields.fields[r])
                )),
                !this.options.inFields.removeDuplicateKeyword ||
                  (0 <= (t = e[r].indexOf(s.autosuggest.trim())) &&
                    e[r].splice(t, 1)))
          var a = []
          if (this.options.sortByLength) {
            var u = 0
            for (p in e)
              for (var l = 0; l < e[p].length; l++)
                (a[u] = { filterName: p, filterValue: e[p][l] }), u++
            a.sort(function (t, s) {
              return h(t.filterValue, s.filterValue)
            })
          }
          if (c.isEmptyObject(e))
            this.currentResults.KEYWORD_SUGGESTION.push({
              autosuggest: s.autosuggest,
              highlighted: o,
              type: 'KEYWORD_SUGGESTION',
              source: s.unbxdAutosuggestSrc,
            })
          else {
            this.currentResults.IN_FIELD.push({
              autosuggest: s.autosuggest,
              highlighted: o,
              type: 'keyword',
              source: s.unbxdAutosuggestSrc,
            })
            n = this
            if (this.options.sortByLength)
              for (var p = 0; p < a.length; p++)
                '' !== a[p].filterValue &&
                  this.currentResults.IN_FIELD.push({
                    autosuggest: s.autosuggest,
                    highlighted:
                      'separate' === this.options.inFields.type
                        ? n.prepareinFieldsKeyword(a[p].filterValue)
                        : n.highlightStr(s.autosuggest) +
                          ' in ' +
                          n.prepareinFieldsKeyword(a[p].filterValue),
                    type: s.doctype,
                    filtername: a[p].filterName,
                    filtervalue: a[p].filterValue,
                    _original: s,
                    source: s.unbxdAutosuggestSrc,
                  })
            else
              for (var r in e)
                for (var d = 0; d < e[r].length; d++)
                  '' !== e[r][d] &&
                    this.currentResults.IN_FIELD.push({
                      autosuggest: s.autosuggest,
                      highlighted:
                        'separate' === this.options.inFields.type
                          ? n.prepareinFieldsKeyword(e[r][d])
                          : n.highlightStr(s.autosuggest) +
                            ' in ' +
                            n.prepareinFieldsKeyword(e[r][d]),
                      type: s.doctype,
                      filtername: r,
                      filtervalue: e[r][d],
                      _original: s,
                      source: s.unbxdAutosuggestSrc,
                    })
          }
        },
        sortSuggestionsBylength: function () {
          ;(this.currentResults.SORTED_SUGGESTIONS =
            this.currentResults.KEYWORD_SUGGESTION.concat(
              this.currentResults.TOP_SEARCH_QUERIES,
              this.currentResults.PROMOTED_SUGGESTION
            )),
            this.currentResults.SORTED_SUGGESTIONS.sort(function (t, s) {
              return h(t.autosuggest, s.autosuggest)
            }),
            this.currentResults.IN_FIELD.sort(function (t, s) {
              return h(t.autosuggest, s.autosuggest)
            })
        },
        processData: function (t) {
          var s
          this.options.maxSuggestions && (s = this.max_suggest(t)),
            (this.currentResults = {
              KEYWORD_SUGGESTION: [],
              TOP_SEARCH_QUERIES: [],
              POPULAR_PRODUCTS: [],
              IN_FIELD: [],
              SORTED_SUGGESTIONS: [],
              PROMOTED_SUGGESTION: [],
            }),
            (this.clickResults = { TRENDING_QUERIES: [] })
          for (
            var e = 0, i = [], o = [], n = 0;
            n < t.response.products.length;
            n++
          ) {
            var r = t.response.products[n]
            this.options.maxSuggestions
              ? 'TOP_SEARCH_QUERIES' == r.doctype &&
                s.topquery > this.currentResults.TOP_SEARCH_QUERIES.length &&
                this.isUnique(r.autosuggest, o)
                ? this.processTopSearchQuery(r)
                : 'IN_FIELD' == r.doctype &&
                  s.infields + s.key_rem + s.top_rem > e &&
                  this.isUnique(r.autosuggest, i) &&
                  this.isUnique(r.autosuggest, o)
                ? s.infields > e
                  ? (e++, this.processInFields(r))
                  : s.key_rem + s.top_rem >
                      this.currentResults.KEYWORD_SUGGESTION.length &&
                    this.isUnique(r.autosuggest, o) &&
                    this.processKeywordSuggestion(r)
                : 'KEYWORD_SUGGESTION' == r.doctype &&
                  s.keyword > this.currentResults.KEYWORD_SUGGESTION.length &&
                  this.isUnique(r.autosuggest, i)
                ? this.processKeywordSuggestion(r)
                : 'POPULAR_PRODUCTS' == r.doctype &&
                  this.options.popularProducts.count >
                    this.currentResults.POPULAR_PRODUCTS.length
                ? this.processPopularProducts(r)
                : 'PROMOTED_SUGGESTION' == r.doctype &&
                  s.promoted > this.currentResults.PROMOTED_SUGGESTION.length &&
                  this.isUnique(r.autosuggest, o) &&
                  this.processPromotedSuggestion(r)
              : 'TOP_SEARCH_QUERIES' == r.doctype &&
                this.options.topQueries.count >
                  this.currentResults.TOP_SEARCH_QUERIES.length &&
                this.isUnique(r.autosuggest, o)
              ? this.processTopSearchQuery(r)
              : 'IN_FIELD' == r.doctype &&
                this.options.inFields.count > e &&
                this.isTempUnique(r.autosuggest, i) &&
                this.isUnique(r.autosuggest, o)
              ? this.processInFields(r)
              : 'KEYWORD_SUGGESTION' == r.doctype &&
                this.options.keywordSuggestions.count >
                  this.currentResults.KEYWORD_SUGGESTION.length &&
                this.isUnique(r.autosuggest, o)
              ? this.processKeywordSuggestion(r)
              : 'POPULAR_PRODUCTS' == r.doctype &&
                this.options.popularProducts.count >
                  this.currentResults.POPULAR_PRODUCTS.length
              ? this.processPopularProducts(r)
              : 'PROMOTED_SUGGESTION' == r.doctype &&
                this.options.promotedSuggestions.count >
                  this.currentResults.PROMOTED_SUGGESTION.length &&
                this.isUnique(r.autosuggest, o) &&
                this.processPromotedSuggestion(r)
          }
          this.options.filtered && this.getfilteredPopularProducts(),
            this.options.sortByLength && this.sortSuggestionsBylength()
          this.currentResults.POPULAR_PRODUCTS.length,
            this.currentResults.IN_FIELD.length
          if (this.options.sortSuggestionsOnLength)
            for (var a in this.currentResults)
              'in_field' != a.toLowerCase() &&
                this.currentResults[a].sort(function (t, s) {
                  return t.autosuggest.length > s.autosuggest.length ? 1 : -1
                })
        },
        escapeStr: function (t) {
          return t.replace(/([\\{}()|.?*+\-\^$\[\]])/g, '\\$1')
        },
        highlightStr: function (t) {
          var s = t,
            e = c.trim(this.params.q + '')
          if (e.indexOf(' ')) {
            var i,
              o,
              n = e.split(' ')
            for (i in n)
              n.hasOwnProperty(i) &&
                (-1 != (o = s.toLowerCase().lastIndexOf('</strong>')) &&
                  (o += 9),
                (s =
                  s.substring(0, o) +
                  s
                    .substring(o)
                    .replace(
                      new RegExp(this.escapeStr(n[i]), 'gi'),
                      function (t) {
                        return '<strong>' + t + '</strong>'
                      }
                    )))
          } else
            (t = s.toLowerCase().indexOf(e)),
              (s =
                0 <= t
                  ? s.substring(0, t) +
                    '<strong>' +
                    s.substring(t, t + e.length) +
                    '</strong>' +
                    s.substring(t + e.length)
                  : s)
          return s
        },
        prepareinFieldsKeyword: function (t) {
          return (
            '<span class="unbxd-as-suggestions-infields">' +
            (t =
              this.options.customInfieldsFilter &&
              'function' == typeof this.options.customInfieldsFilter
                ? this.options.customInfieldsFilter(t)
                : t) +
            '</span>'
          )
        },
        prepareinFieldsHTML: function () {
          return 'inline' === this.options.inFields.type
            ? '{{#if data.IN_FIELD}}' +
                (this.options.inFields.header
                  ? '<li class="unbxd-as-header">' +
                    this.options.inFields.header +
                    '</li>'
                  : '') +
                '{{#each data.IN_FIELD}}{{#unbxdIf type "keyword"}}{{else}}<li data-index="{{@index}}" data-type="{{type}}" data-value="{{autosuggest}}" data-filtername="{{filtername}}" data-filtervalue="{{filtervalue}}"  data-source="{{source}}">' +
                (this.options.inFields.tpl ||
                  this.default_options.inFields.tpl) +
                '</li>{{/unbxdIf}}{{/each}}{{/if}}'
            : '{{#if data.IN_FIELD}}' +
                (this.options.inFields.header
                  ? '<li class="unbxd-as-header">' +
                    this.options.inFields.header +
                    '</li>'
                  : '') +
                '{{#each data.IN_FIELD}}{{#unbxdIf type "keyword"}}<li class="unbxd-as-keysuggestion" data-index="{{@index}}" data-value="{{autosuggest}}" data-type="IN_FIELD" data-source="{{source}}">' +
                (this.options.inFields.tpl ||
                  this.default_options.inFields.tpl) +
                '</li>{{else}}<li class="unbxd-as-insuggestion" style="color:' +
                this.options.theme +
                ';" data-index="{{@index}}" data-type="{{type}}" data-value="{{autosuggest}}" data-filtername="{{filtername}}" data-filtervalue="{{filtervalue}}"  data-source="{{source}}">in ' +
                (this.options.inFields.tpl ||
                  this.default_options.inFields.tpl) +
                '</li>{{/unbxdIf}}{{/each}}{{/if}}'
        },
        preparekeywordSuggestionsHTML: function () {
          return (
            '{{#if data.KEYWORD_SUGGESTION}}' +
            (this.options.keywordSuggestions.header
              ? '<li class="unbxd-as-header">' +
                this.options.keywordSuggestions.header +
                '</li>'
              : '') +
            '{{#each data.KEYWORD_SUGGESTION}}<li class="unbxd-as-keysuggestion" data-value="{{autosuggest}}" data-index="{{@index}}" data-type="{{type}}"  data-source="{{source}}">' +
            (this.options.keywordSuggestions.tpl ||
              this.default_options.keywordSuggestions.tpl) +
            '</li>{{/each}}{{/if}}'
          )
        },
        prepareTrendingQueriesHTML: function () {
          return (
            '<ul class="unbxd-as-maincontent unbxd-as-suggestions-overall unbxd-as-trending">' +
            (this.options.trendingSearches.header
              ? '<li class="unbxd-as-header">' +
                this.options.trendingSearches.header +
                '</li>'
              : '') +
            '{{#each data1}}<li class="unbxd-as-keysuggestion" data-value="{{autosuggest}}" data-index="{{@index}}" data-type="{{type}}"  data-source="{{source}}">' +
            (this.options.trendingSearches.tpl ||
              this.default_options.trendingSearches.tpl) +
            '</li>{{/each}}</ul>'
          )
        },
        preparepromotedSuggestionsHTML: function () {
          return (
            '{{#if data.PROMOTED_SUGGESTION}}' +
            (this.options.promotedSuggestions.header
              ? '<li class="unbxd-as-header">' +
                this.options.promotedSuggestions.header +
                '</li>'
              : '') +
            '{{#each data.PROMOTED_SUGGESTION}}<li class="unbxd-as-keysuggestion" data-value="{{autosuggest}}" data-index="{{@index}}" data-type="{{type}}"  data-source="{{source}}">' +
            (this.options.promotedSuggestions.tpl ||
              this.default_options.promotedSuggestions.tpl) +
            '</li>{{/each}}{{/if}}'
          )
        },
        preparetopQueriesHTML: function () {
          return (
            '{{#if data.TOP_SEARCH_QUERIES}}' +
            (this.options.topQueries.header
              ? '<li class="unbxd-as-header">' +
                this.options.topQueries.header +
                '</li>'
              : '') +
            '{{#each data.TOP_SEARCH_QUERIES}}<li class="unbxd-as-keysuggestion" data-type="{{type}}" data-index="{{@index}}" data-value="{{autosuggest}}">' +
            (this.options.topQueries.tpl ||
              this.default_options.topQueries.tpl) +
            '</li>{{/each}}{{/if}}'
          )
        },
        preparefilteredPopularProducts: function () {
          return (
            (this.compiledPopularProductHeader
              ? '<li class="unbxd-as-header unbxd-as-popular-product-header">' +
                this.compiledPopularProductHeader +
                '</li>'
              : '') +
            '{{#data}}<li class="unbxd-as-popular-product ' +
            ('grid' === this.options.popularProducts.view
              ? 'unbxd-as-popular-product-grid'
              : '') +
            '" data-value="{{autosuggest}}" data-index="{{@index}}" data-type="{{type}}" data-pid="{{pid}}" data-src="{{src}}">' +
            (this.options.popularProducts.tpl ||
              this.default_options.popularProducts.tpl) +
            '</li>{{/data}}'
          )
        },
        preparepopularProductsHTML: function () {
          return (
            '{{#if data.POPULAR_PRODUCTS}}' +
            (this.compiledPopularProductHeader
              ? '<li class="unbxd-as-header unbxd-as-popular-product-header">' +
                this.compiledPopularProductHeader +
                '</li>'
              : '') +
            '{{#data.POPULAR_PRODUCTS}}<li class="unbxd-as-popular-product ' +
            ('grid' === this.options.popularProducts.view
              ? 'unbxd-as-popular-product-grid'
              : '') +
            '" data-value="{{autosuggest}}" data-index="{{@index}}" data-type="{{type}}" data-pid="{{pid}}" >' +
            (this.options.popularProducts.tpl ||
              this.default_options.popularProducts.tpl) +
            '</li>{{/data.POPULAR_PRODUCTS}}{{/if}}'
          )
        },
        standardizeKeys: function (t) {
          return (t =
            'inFields' === t
              ? 'IN_FIELD'
              : 'popularProducts' === t
              ? 'POPULAR_PRODUCTS'
              : 'topQueries' === t
              ? 'TOP_SEARCH_QUERIES'
              : 'promotedSuggestions' === t
              ? 'PROMOTED_SUGGESTION'
              : 'KEYWORD_SUGGESTION')
        },
        prepareSortedSuggestionsHTML: function () {
          return (
            '{{#if data.SORTED_SUGGESTIONS}}{{#each data.SORTED_SUGGESTIONS}}<li class="unbxd-as-sorted-suggestion" data-type="{{type}}" data-index="{{@index}}" data-value="{{autosuggest}}" data-sorted="true">' +
            (this.options.sortedSuggestions.tpl ||
              this.default_options.sortedSuggestions.tpl) +
            '</li>{{/each}}{{/if}}'
          )
        },
        preprocessHTML: function () {
          ;((this.options.isMobile && this.options.isMobile()) || p.any()) &&
            ((this.options.template = this.options.mobile.template),
            (this.options.mainTpl = this.options.mobile.mainTpl),
            (this.options.popularProducts.count =
              this.options.mobile.popularProducts.count))
        },
        prepareHTML: function () {
          this.preprocessHTML()
          var s = ''
          '1column' === this.options.template &&
          this.options.popularProducts.viewMore &&
          this.options.popularProducts.viewMore.enabled
            ? (s +=
                '<ul class="unbxd-as-maincontent unbxd-as-suggestions-overall unbxd-as-view-more">')
            : (s +=
                '<ul class="unbxd-as-maincontent unbxd-as-suggestions-overall">')
          var t =
              '<ul class="unbxd-as-maincontent unbxd-as-suggestions-overall unbxd-as-mobile-view">',
            e = '',
            i = '',
            o = !1,
            n = this,
            r = 0,
            a = 0
          '1column' === this.options.template &&
            this.options.suggestionsHeader &&
            (n.currentResults.IN_FIELD.length ||
              n.currentResults.KEYWORD_SUGGESTION.length ||
              n.currentResults.TOP_SEARCH_QUERIES.length) &&
            (i =
              i +
              '<li class="unbxd-as-header unbxd-as-suggestions-header">' +
              this.options.suggestionsHeader +
              '</li>'),
            n.currentResults.IN_FIELD.length ||
              n.currentResults.KEYWORD_SUGGESTION.length ||
              n.currentResults.POPULAR_PRODUCTS.length ||
              n.currentResults.TOP_SEARCH_QUERIES.length ||
              n.currentResults.PROMOTED_SUGGESTION.length ||
              !this.options.noResultTpl ||
              ((o = !0),
              'function' == typeof this.options.noResultTpl
                ? (s =
                    "<ul class='unbxd-as-noresults-view unbxd-as-suggestions-overall'><li class='no-results-view'>" +
                    this.options.noResultTpl.call(
                      n,
                      encodeURIComponent(n.params.q)
                    ) +
                    '</li></ul>')
                : 'string' == typeof this.options.noResultTpl &&
                  (s =
                    "<ul class='unbxd-as-noresults-view unbxd-as-suggestions-overall'>" +
                    this.options.noResultTpl +
                    '</li></ul>')),
            this.options.mainTpl.forEach(function (t) {
              ;(t = n.standardizeKeys(t)), (r += n.currentResults[t].length)
            }),
            this.options.sideTpl.forEach(function (t) {
              a +=
                n.currentResults[
                  (t =
                    'inFields' === t
                      ? 'IN_FIELD'
                      : 'popularProducts' === t
                      ? 'POPULAR_PRODUCTS'
                      : 'topQueries' === t
                      ? 'TOP_SEARCH_QUERIES'
                      : 'promotedSuggestions' === t
                      ? 'PROMOTED_SUGGESTION'
                      : 'KEYWORD_SUGGESTION')
                ].length
            }),
            '2column' !== this.options.template ||
              this.options.sideTpl.length ||
              this.options.mainTpl ||
              ((this.options.sideTpl = ['keywordSuggestions', 'topQueries']),
              (this.options.mainTpl = ['inFields', 'popularProducts'])),
            '2column' === this.options.template &&
              (0 == r && 0 != a
                ? ((s = '<ul class="unbxd-as-sidecontent">'),
                  this.options.sideTpl.forEach(function (t) {
                    ;(n.options.sortByLength &&
                      ('topQueries' == t ||
                        'keywordSuggestions' == t ||
                        'promotedSuggestions' == t)) ||
                      (s += n[(t = 'prepare' + t + 'HTML')]())
                  }),
                  this.options.popularProducts.viewMore &&
                    this.options.popularProducts.viewMore.enabled &&
                    (s += this.options.popularProducts.viewMore.tpl),
                  (s += '</ul>'))
                : 0 < r &&
                  0 != a &&
                  ((e =
                    this.options.popularProducts.viewMore &&
                    this.options.popularProducts.viewMore.enabled
                      ? '<ul class="unbxd-as-sidecontent unbxd-as-view-more">'
                      : '<ul class="unbxd-as-sidecontent">'),
                  this.options.sideTpl.forEach(function (t) {
                    ;(n.options.sortByLength &&
                      ('topQueries' == t ||
                        'keywordSuggestions' == t ||
                        'promotedSuggestions' == t)) ||
                      (e += n[(t = 'prepare' + t + 'HTML')]())
                  }),
                  this.options.popularProducts.viewMore &&
                    this.options.popularProducts.viewMore.enabled &&
                    (e += this.options.popularProducts.viewMore.tpl),
                  (e += '</ul>'),
                  (i +=
                    '<ul class="unbxd-as-maincontent unbxd-as-suggestions-overall">'),
                  this.options.suggestionsHeader &&
                    (i =
                      i +
                      '<li class="unbxd-as-header unbxd-as-suggestions-header">' +
                      this.options.suggestionsHeader +
                      '</li>'))),
            !o &&
              0 < r &&
              (this.options.sortByLength &&
                (i += n.prepareSortedSuggestionsHTML()),
              this.options.mainTpl.forEach(function (t) {
                n.currentResults[n.standardizeKeys(t)].length &&
                  '' === l &&
                  (l = n.currentResults[n.standardizeKeys(t)][0].autosuggest),
                  (n.options.sortByLength &&
                    ('topQueries' == t ||
                      'keywordSuggestions' == t ||
                      'promotedSuggestions' == t)) ||
                    (i += n[(t = 'prepare' + t + 'HTML')]())
              }),
              this.options.popularProducts.viewMore &&
                this.options.popularProducts.viewMore.enabled &&
                (i += this.options.popularProducts.viewMore.tpl),
              (i += '</ul>'),
              (s =
                (this.options.isMobile && this.options.isMobile()) || p.any()
                  ? t + i
                  : '1column' === this.options.template
                  ? s + i + '</ul>'
                  : 'right' === this.options.sideContentOn
                  ? 0 < r && 0 === a
                    ? s + i + '</ul>'
                    : i + e
                  : e + i))
          t = u.compile(s)
          return (
            this.log(
              'prepraing html :-> template : ' +
                this.options.template +
                ' ,carts : ' +
                this.options.showCarts +
                ' ,cartType : ' +
                this.options.cartType
            ),
            this.log('html data : ', this.currentResults),
            t({
              data: this.currentResults,
              showCarts: this.options.showCarts,
              cartType: this.options.cartType,
            })
          )
        },
        addToCache: function (t, s) {
          t in this.cache || (this.cache[t] = c.extend({}, s))
        },
        inCache: function (t) {
          return t in this.cache && this.cache.hasOwnProperty(t)
        },
        getFromCache: function (t) {
          return this.cache[t]
        },
        destroy: function (t) {
          t.$input.unbind('.auto'),
            (t.input.lastSelected = null),
            t.$input.removeAttr('autocomplete', 'off'),
            t.$results.remove(),
            t.$input.removeData('autocomplete')
        },
        setOption: function (t, s) {
          var e = t.split('.')
          if (1 < e.length) {
            for (var i = this.options, o = 0; o < e.length - 1; o++)
              e[o] in i || (i[e[o]] = {}), (i = i[e[o]])
            i[e[e.length - 1]] = s
          } else this.options[t] = s
          ;(this.previous = ''),
            this.$results.html(''),
            (this.cache = {}),
            (this.cache.length = 0)
        },
        log: function () {},
      })),
      (c.fn.unbxdautocomplete = function (t) {
        return this.each(function () {
          try {
            this.auto = new s(this, t)
          } catch (t) {}
        })
      })
  }
  function getUnbxdSiteKey() {
    return window.UnbxdSiteName
  }
  function getUnbxdApiKey() {
    return window.UnbxdApiKey
  }
  var unbxd_as_config
  unbxdAutoSuggestFunction($, Handlebars),
    (unbxd_as_config = {
      siteName: 'sleekhair_mybigcommerce_com-u1474746314480',
      APIKey: 'a32a56fd1a3bd51b04a38278db19e452',
      resultsClass: 'unbxd-as-wrapper',
      minChars: 1,
      delay: 100,
      loadingClass: 'unbxd-as-loading',
      mainWidth: 0.158 * $('.Navbar_root__2kbI9').outerWidth(),
      sideWidth:
        $('.Navbar_root__2kbI9').outerWidth() -
        0.157 * $('.Navbar_root__2kbI9').outerWidth() -
        130,
      zIndex: 9999,
      position: 'absolute',
      sideContentOn: 'right',
      template: '2column',
      theme: '#ff8400',
      platform: 'io',
      mainTpl: ['keywordSuggestions'],
      sideTpl: ['popularProducts'],
      featuredFields: [],
      showCarts: !1,
      cartType: 'separate',
      maxSuggestions: 10,
      hbsHelpers: function () {
        Handlebars.registerHelper('productBrand', function (t) {
          return t ? t[0] : ''
        }),
          Handlebars.registerHelper('productRating', function (t, s) {
            var e = Math.round(t),
              i = 5 - e
            selectedHtml = ''
            for (var o = 0; o < e; o++)
              selectedHtml +=
                '<img src ="https://www.sleekshop.com/content/nextjs/star-ratings-active.svg">'
            if (0 < e)
              for (var n = 0; n < i; n++)
                selectedHtml +=
                  '<img src ="https://www.sleekshop.com/content/nextjs/star-ratings.svg">'
            s =
              0 == s || null == s
                ? ''
                : '<p class="reviews-count">(' +
                  s.replaceAll(' ', '') +
                  ')</span>'
            return selectedHtml + s
          }),
          Handlebars.registerHelper('productPrice', function (t, s, e, i) {
            var o = ''
            return (
              t == e && s == i && s == e
                ? (console.log('1'),
                  (o +=
                    '<div class="black-color-price">$' +
                    t.toFixed(2) +
                    '</div>'))
                : t == e && s == i && e != i
                ? (console.log('2'),
                  (o +=
                    '<div class="black-color-pink-price">$' +
                    e.toFixed(2) +
                    '</div> <div class="pink-color-price">$' +
                    i.toFixed(2) +
                    '</div>'))
                : t == s && e == i
                ? (console.log('3'),
                  (o +=
                    '<div class="black-color-price">$' +
                    t.toFixed(2) +
                    ' - $' +
                    e.toFixed(2) +
                    '</div>'))
                : t == e &&
                  s != i &&
                  (console.log('4'),
                  (o +=
                    '<div class="black-color-pink-price">$' +
                    t.toFixed(2) +
                    '</div> <div class="pink-color-price">$' +
                    s.toFixed(2) +
                    ' - $' +
                    i.toFixed(2) +
                    '</div>')),
              o
            )
          }),
          Handlebars.registerHelper('showReviewsViewMore', function (t) {
            return t && 0 != t && null != t ? '+' + t + 'more' : ''
          })
      },
      filtered: !0,
      mobile: {
        template: '1column',
        maxSuggestions: 6,
        mainTpl: [
          'topQueries',
          'keywordSuggestions',
          'promotedSuggestions',
          'popularProducts',
        ],
        popularProducts: {
          count: 5,
          fields: [
            'sku',
            'uniqueId',
            'imageUrl',
            'title',
            'price',
            'uniqueId',
            'productUrl',
            'brand',
            'autosuggest',
            'doctype',
            'pdrating',
            'pdratingcount',
            'v_calculated_price',
          ],
          price: !0,
          image: !0,
          imageUrlOrFunction: 'imageUrl',
          priceFunctionOrKey: 'price',
          view: 'grid',
          currency: '$',
          header: '',
          tpl: [
            '<div class="unbxd-as-popular-product unbxd-as-popular-product-grid nxt-ac-item" data-value="{{_original.autosuggest}}" data-index="{{@index}}" data-type="{{type}}" data-pid="{{_original.uniqueId}}" data-src="{{src}}">',
            '<div class="unbxd-as-popular-product-info">',
            '<div class="unbxd-as-popular-product-image-container">',
            '<img src="{{_original.imageUrl}}" />',
            '</div>',
            '<div class="unbxd-as-popular-product-name">{{_original.title}}</div>',
            '</div></div>',
          ].join(''),
        },
      },
      noResultTpl: function (t) {
        return (
          $('.unbxd-as-maincontent li').css('width', '70% !important'),
          $('.unbxd-as-maincontent li').css('margin-left', '0px !important'),
          '<div class="noResultsAs" style="text-align:center">No results found for ' +
            decodeURIComponent(t) +
            '</div>'
        )
      },
      processResultsStyles: function (t) {
        return (
          0 == $('.unbxd-as-maincontent').length &&
            $('.unbxd-as-sidecontent').css('margin-left', '130px'),
          screen.width < 1024
            ? 0 < $('#mobile-search').val().length
              ? $('.unbxd-as-wrapper').css({ visibility: 'visible' })
              : $('.unbxd-as-wrapper').css({ visibility: 'hidden' })
            : 0 < $('#search').val().length
            ? $('.unbxd-as-wrapper').css({ visibility: 'visible' })
            : $('.unbxd-as-wrapper').css({ visibility: 'hidden' }),
          (t.left = 'auto'),
          1023 < screen.width &&
            (t.top =
              $(
                '.Searchbar_rootcustom__1dui-.open-extend-search'
              ).outerHeight() + 2),
          console.log(t),
          t
        )
      },
      suggestionsHeader: 'MOST POPULAR SEARCHES',
      keywordSuggestions: {
        count: 3,
        header: '',
        tpl: '{{{safestring highlighted}}}',
      },
      topQueries: {
        count: 3,
        hidden: !1,
        header: '',
        tpl: '{{{safestring highlighted}}}',
      },
      promotedSuggestions: {
        count: 3,
        header: '',
        tpl: '{{{safestring highlighted}}}',
      },
      popularProducts: {
        count: 4,
        fields: [
          'sku',
          'uniqueId',
          'imageUrl',
          'title',
          'price',
          'uniqueId',
          'productUrl',
          'brand',
          'autosuggest',
          'doctype',
          'pdrating',
          'pdratingcount',
          'v_calculated_price',
          'min_price',
          'min_calculated_price',
          'max_price',
          'max_calculated_price',
        ],
        price: !0,
        image: !0,
        imageUrlOrFunction: 'imageUrl',
        priceFunctionOrKey: 'price',
        view: 'grid',
        currency: '$',
        header: 'MOST POPULAR PRODUCTS',
        tpl: [
          '<div class="unbxd-as-popular-product unbxd-as-popular-product-grid nxt-ac-item" data-value="{{_original.autosuggest}}" data-index="{{@index}}" data-type="{{type}}" data-pid="{{_original.uniqueId}}" data-src="{{src}}">',
          '<div class="unbxd-as-popular-product-info">',
          '<span class="new">New</span>',
          '<div class="unbxd-as-popular-product-image-container">',
          '<img src="{{_original.imageUrl}}" />',
          '</div>',
          '<div class="unbxd-product-info">',
          '<div class="unbxd-brand">{{{productBrand _original.brand}}}</div>',
          '<div class="unbxd-stars">',
          '{{{productRating _original.pdrating _original.pdratingcount}}}',
          '</div>',
          '</div>',
          '<div class="unbxd-as-popular-product-name">{{_original.title}} <span class="reviews-more">{{{showReviewsViewMore _original.pdratingcount}}}</span></div>',
          '<div class = "unbxd-produxt-price">{{{productPrice  _original.min_price _original.min_calculated_price _original.max_price _original.max_calculated_price}}}</div>',
          '</div></div>',
        ].join(''),
      },
      onSimpleEnter: function (t) {
        console.log(this.input.value.trim().length),
          t.preventDefault(),
          0 < this.input.value.trim().length &&
            (window.location =
              window.location.origin +
              '/search?q=' +
              encodeURIComponent(this.input.value))
      },
      onItemSelect: function (t, s) {
        'POPULAR_PRODUCTS' === t.type || 'POPULAR_PRODUCTS_FILTERED' === t.type
          ? (window.location =
              window.location.origin +
              '/' +
              s.productUrl.replaceAll('.html', ''))
          : 'IN_FIELD' != t.type && 'brand' == t.type
          ? (window.location =
              window.location.origin +
              '/search?q=' +
              encodeURIComponent(s.autosuggest_unstemmed))
          : (window.location =
              window.location.origin +
              '/search?q=' +
              encodeURIComponent(t.value))
      },
    }),
    (screen.width < 1024
      ? $('#mobile-search')
      : $('#search')
    ).unbxdautocomplete(unbxd_as_config),
    $(document).ready(function () {
      $('.mobileMenu-toggle').after(
        '<div class="click-icon-search"><svg class="Searchbar_icon__2Ux5V" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path></svg></div>'
      ),
        $('.Navbar_logocustom__3e0xJ img').addClass('logo-image')
    }),
    $(document).on('click', '#search', function () {
      0 == $('.Searchbar_iconContainer_close').length &&
        $(this)
          .closest('.Searchbar_rootcustom__1dui-')
          .append('<div class="Searchbar_iconContainer_close">X</div>'),
        $(this)
          .closest('.Searchbar_rootcustom__1dui-')
          .closest('.justify-center')
          .addClass('open-extend'),
        $(this)
          .closest('.Searchbar_rootcustom__1dui-')
          .addClass('open-extend-search'),
        $('body').addClass('unbxd-body-overlay'),
        $('.Searchbar_iconContainer_close').css('display', 'flex'),
        $('.unbxd-as-wrapper').css('visibility', 'visible')
    }),
    $(document).on('click', '.Searchbar_iconContainer_close', function () {
      console.log('hii'),
        $(this)
          .closest('.Searchbar_rootcustom__1dui-')
          .removeClass('open-extend-search'),
        $(this)
          .closest('.Searchbar_rootcustom__1dui-')
          .closest('.justify-center')
          .removeClass('open-extend'),
        $('body').removeClass('unbxd-body-overlay'),
        $(this).css('display', 'none'),
        $('.unbxd-as-wrapper').css('visibility', 'hidden')
    }),
    $(document).on('click', '#mobile-search', function () {
      0 == $('.flex.pb-4 .Searchbar_iconContainer_close').length &&
        $(this)
          .closest('.Searchbar_rootcustom__1dui-')
          .append('<div class="Searchbar_iconContainer_close">X</div>'),
        $('.Searchbar_iconContainer_close').css('display', 'flex')
    }),
    $(document).on('click', '.click-icon-search', function () {
      $('.flex.pb-4 .Searchbar_rootcustom__1dui-').addClass('open-mobile'),
        $('.flex.items-center.justify-end').css('display', 'none'),
        $('.flex.pb-4 .Searchbar_rootcustom__1dui-.open-mobile').css(
          'display',
          'block'
        )
    }),
    $(document).on(
      'click',
      '.open-mobile .Searchbar_iconContainer_close',
      function () {
        $('.flex.pb-4 .Searchbar_rootcustom__1dui-').removeClass('open-mobile'),
          $('.flex.items-center.justify-end').css('display', 'flex'),
          $('.flex.pb-4 .Searchbar_rootcustom__1dui-').css('display', 'none')
      }
    ),
    $('body').append(
      '<div id="myModal" class="modal"> <div class="modal-content"><div class="filter-sort-heading"><div class="filters-heading"><div class="filters-btn">Filter</div><div class="close">&times;</div></div><div class ="unbxd-sort-container"><div class ="sort-arrow"><div class ="unbxd-sort-header">Sort by</div><span class = "sort-selected-item"></span><img class="filters-far-arrow" src="https://www.sleekshop.com/content/nextjs/filter-arrow.svg"></div><div class ="unbxd-sortby">SortBy</div></div><ul class="unxfilters"></ul></div><div class = "clear-all-buttons"><button data-action="clearFacets" class="UNX-default-btn UNX-facet-trigger">Clear all</button><button data-action="applyFacets" class="UNX-primary-btn UNX-facet-trigger">APPLY</button></div></div></div>'
    ),
    $(document).on('click', '.filter-mob-buttons .sort-btn', function () {
      $(this)
        .closest('.filter-mob-buttons')
        .find('.unbxd-sortby')
        .toggleClass('dynamic-sort')
    }),
    $(document).on('click', '.unbxd-sort-container', function () {
      $(this).find('.unbxd-sortby').toggleClass('dynamic-sort'),
        $(this)
          .closest('.modal-content')
          .find('.unxfilters .UNX-facets-results-block')
          .toggleClass('filters-sort')
    })

  console.log('this console proves that this script is running ')
}

export default SomeFunc
