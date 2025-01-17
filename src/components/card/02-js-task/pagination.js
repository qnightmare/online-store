export default class Pagination {
  // totalPages = 12;

  constructor ({
    activePageIndex = 0,
    totalPages = 0
  }={}) {
    // this.totalPages = 12;

    this.activePageIndex = activePageIndex;
    this.totalPages = totalPages;
    // this.pageIndex =
    this.render();
    this.addEventListener();

  }

  getTeamplate () {
    return `


    <ul class="os-pagination">
      <li class="os-pagination  back"
      data-element="nav-prev"><i class="os-pagination-pages bi bi-chevron-left"></i></li>
    ${this.getPages()}
      <li class="os-pagination forvard"
      data-element="nav-next"><i class=" os-pagination-pages bi bi-chevron-right"></i></li>
    </ul>

     `;

  }


  getPages () {

        return `
      <ul class="os-pagination" data-element="pagination">
      ${new Array(this.totalPages).fill(1).map((item, index) => {
        return this.getPageTemplate(index);
      }).join('')}
      </ul>
    `;
  }
  getPageTemplate (pageIndex = 0) {
    const isActive = pageIndex === this.activePageIndex ? 'active' : '';
    return `<li
    class="os-pagination-pages ${isActive}"
    data-page-index="${pageIndex}">
    <a href="#"></a>
    ${pageIndex+1}</li>`
  };
  setPage (pageIndex = 0) {
    if (pageIndex === this.activePageIndex) return;
    if (pageIndex > this.totalPages - 1 || pageIndex <0) return;
    this.dispatchEvent(pageIndex);
    const activePage = this.element.querySelector('.os-pagination-pages.active');
    if (activePage) {
      activePage.classList.remove('active');
    }
      const nextActivePage = this.element.querySelector (`[data-page-index="${pageIndex}"]`);
      if (nextActivePage) {
        nextActivePage.classList.add('active');

    }
    this.activePageIndex = pageIndex;
  }

  nextPage (pageIndex = 0) {
    const nextPageIndex = this.activePageIndex +1;
    this.setPage(nextPageIndex);

  }

  prevPage (pageIndex = 0) {
    const prevPageIndex = this.activePageIndex -1;
    this.setPage(prevPageIndex);


  }


  render () {
    const wrapper = document.createElement ('div');

    wrapper.innerHTML = this.getTeamplate ();

    this.element = wrapper;
  }
  addEventListener () {
    const prevPageBtn = this.element.querySelector('[data-element="nav-prev"]');
    const nextPageBtn = this.element.querySelector('[data-element="nav-next"]');
    const pagesList = this.element.querySelector('[data-element="pagination"]');

    prevPageBtn.addEventListener('click', () => {
      this.prevPage();
    });

    nextPageBtn.addEventListener('click', () => {
      this.nextPage();
    });



    pagesList.addEventListener('click', event => {
      const pageItem = event.target.closest ('.os-pagination-pages');
      if (!pageItem) return;
      const {pageIndex} = pageItem.dataset;


      this.setPage(parseInt(pageIndex, 10));

    });

  }

  dispatchEvent (pageIndex) {
    const customEvent = new CustomEvent('page-changed', {
      detail: pageIndex,
      bubbles: true
    });

    this.element.dispatchEvent(customEvent);


  }
}
