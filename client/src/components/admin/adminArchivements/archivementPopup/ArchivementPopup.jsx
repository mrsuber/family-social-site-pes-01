import React from 'react'
import './ArchivementPopup.css'
const ArchivementPopup = ({data,setDepPopup,handleArchivementClose}) => {
  return (
    <div className="admin__Unclear-container-archivement">
      <div className="admin__Unclear-content-archivement">
      <div className="admin__Unclear-btn-container-archivement">
      <button className="admin__Unclear-close-btn-archivement" onClick={handleArchivementClose}>
      Okay
      </button>
      </div>

      <div>

  <ul class="tree">

    {/**<!-- Root node (Category) -->**/}
    <li><div class="sticky">2024</div>
      <ul>

        {/**<!-- Sub category -->**/}
        <li><div class="sticky">Janaury</div></li> {/**<!-- Second level node -->**/}
        <li><div class="sticky">Mammals</div>
          <ul>

            {/**<!-- Skill -->**/}
            <li><div>Elephant</div>
              <ul>

                {/**<!-- Attribute -->**/}
                <li><div>List item 1</div></li>
                <li><div>List item 2</div></li>
                <li><div>List item 3</div></li>
                <li><div>List item 4</div></li>
              </ul>
            </li>
            <li><div>Mouse</div>
              <ul>
                <li><div>List item 1</div></li>
                <li><div>List item 2</div></li>
              </ul>
            </li>
          </ul>
        </li>
        <li><div class="sticky">Reptiles</div></li>
        <li><div class="sticky">Birds</div></li>
        <li><div class="sticky">Mammals</div>
          <ul>
            <li><div>Elephant</div>
              <ul>
                <li><div>List item 1</div></li>
                <li><div>List item 2</div></li>
                <li><div>List item 3</div></li>
                <li><div>List item 4</div></li>
                <li><div>List item 5</div></li>
                <li><div>List item 6</div></li>
                <li><div>List item 7</div></li>
                <li><div>List item 8</div></li>
              </ul>
            </li>
            <li><div>Mouse</div>
              <ul>
                <li><div>List item 1</div></li>
                <li><div>List item 2</div></li>
                <li><div>List item 3</div></li>
                <li><div>List item 4</div></li>
                <li><div>List item 5</div></li>
                <li><div>List item 6</div></li>
                <li><div>List item 7</div></li>
                <li><div>List item 8</div></li>
              </ul>
            </li>
          </ul>
        </li>
        <li><div class="sticky">Reptiles</div></li>
      </ul>
    </li>

    <li><div class="sticky">Plants</div>
      <ul>
        <li><div class="sticky">Flowers</div>
          <ul>
            <li><div>Rose</div>
              <ul>
                <li><div>List item 1</div></li>
                <li><div>List item 2</div></li>
              </ul>
            </li>
            <li><div>Tulip</div>
              <ul>
                <li><div>List item 1</div></li>
                <li><div>List item 2</div></li>
                <li><div>List item 3</div></li>
                <li><div>List item 4</div></li>
                <li><div>List item 5</div></li>
                <li><div>List item 6</div></li>
              </ul>
            </li>
          </ul>
        </li>
        <li><div class="sticky">Trees</div></li>
        <li><div class="sticky">Flowers</div>
          <ul>
            <li><div>Rose</div></li>
            <li><div>Tulip</div>
            </li>
          </ul>
        </li>
        <li><div class="sticky">Trees</div></li>
      </ul>
    </li>

    <li><div class="sticky">Animals</div>
      <ul>

        <li><div class="sticky">Birds</div></li>
        <li><div class="sticky">Mammals</div>
          <ul>
            <li><div>Elephant</div></li>
            <li><div>Mouse</div></li>
          </ul>
        </li>
        <li><div class="sticky">Reptiles</div></li>
      </ul>
    </li>

    <li><div class="sticky">Plants</div>
      <ul>
        <li><div class="sticky">Flowers</div>
          <ul>
            <li><div>Rose</div>
              <ul>
                <li><div>List item 1</div></li>
                <li><div>List item 2</div></li>
                <li><div>List item 3</div></li>
                <li><div>List item 4</div></li>
                <li><div>List item 5</div></li>
                <li><div>List item 6</div></li>
                <li><div>List item 7</div></li>
                <li><div>List item 8</div></li>
              </ul>
            </li>
            <li><div>Tulip</div>
              <ul>
                <li><div>List item 1</div></li>
                <li><div>List item 2</div></li>
                <li><div>List item 3</div></li>
                <li><div>List item 4</div></li>
                <li><div>List item 5</div></li>
                <li><div>List item 6</div></li>
                <li><div>List item 7</div></li>
                <li><div>List item 8</div></li>
              </ul>
            </li>
          </ul>
        </li>
        <li><div class="sticky">Trees</div></li>
      </ul>
    </li>

    <li><div class="sticky">Animals</div>
      <ul>

        <li><div class="sticky">Birds</div></li>
        <li><div class="sticky">Mammals</div>
          <ul>
            <li><div>Elephant</div>
              <ul>
                <li><div>List item 1</div></li>
                <li><div>List item 2</div></li>
                <li><div>List item 3</div></li>
                <li><div>List item 4</div></li>
                <li><div>List item 5</div></li>
                <li><div>List item 6</div></li>
                <li><div>List item 7</div></li>
                <li><div>List item 8</div></li>
              </ul>
            </li>
            <li><div>Mouse</div>
              <ul>
                <li><div>List item 1</div></li>
                <li><div>List item 2</div></li>
                <li><div>List item 3</div></li>
                <li><div>List item 4</div></li>
                <li><div>List item 5</div></li>
                <li><div>List item 6</div></li>
                <li><div>List item 7</div></li>
                <li><div>List item 8</div></li>
              </ul>
            </li>
          </ul>
        </li>
        <li><div class="sticky">Reptiles</div></li>
      </ul>
    </li>

    <li><div class="sticky">Plants</div>
      <ul>
        <li><div class="sticky">Flowers</div>
          <ul>
            <li><div>Rose</div>
              <ul>
                <li><div>List item 1</div></li>
                <li><div>List item 2</div></li>
                <li><div>List item 3</div></li>
                <li><div>List item 4</div></li>
                <li><div>List item 5</div></li>
                <li><div>List item 6</div></li>
                <li><div>List item 7</div></li>
                <li><div>List item 8</div></li>
              </ul>
            </li>
            <li><div>Tulip</div>
              <ul>
                <li><div>List item 1</div></li>
                <li><div>List item 2</div></li>
                <li><div>List item 3</div></li>
                <li><div>List item 4</div></li>
                <li><div>List item 5</div></li>
                <li><div>List item 6</div></li>
                <li><div>List item 7</div></li>
                <li><div>List item 8</div></li>
              </ul>
            </li>
          </ul>
        </li>
        <li><div class="sticky">Trees</div></li>
      </ul>
    </li>

    <li><div class="sticky">Animals</div>
      <ul>

        <li><div class="sticky">Birds</div></li>
        <li><div class="sticky">Mammals</div>
          <ul>
            <li><div>Elephant</div>
              <ul>
                <li><div>List item 1</div></li>
                <li><div>List item 2</div></li>
                <li><div>List item 3</div></li>
                <li><div>List item 4</div></li>
                <li><div>List item 5</div></li>
                <li><div>List item 6</div></li>
                <li><div>List item 7</div></li>
                <li><div>List item 8</div></li>
              </ul>
            </li>
            <li><div>Mouse</div>
              <ul>
                <li><div>List item 1</div></li>
                <li><div>List item 2</div></li>
                <li><div>List item 3</div></li>
                <li><div>List item 4</div></li>
                <li><div>List item 5</div></li>
                <li><div>List item 6</div></li>
                <li><div>List item 7</div></li>
                <li><div>List item 8</div></li>
              </ul>
            </li>
          </ul>
        </li>
        <li><div class="sticky">Reptiles</div></li>
      </ul>
    </li>

    <li><div class="sticky">Plants</div>
      <ul>
        <li><div class="sticky">Flowers</div>
          <ul>
            <li><div>Rose</div>
              <ul>
                <li><div>List item 1</div></li>
                <li><div>List item 2</div></li>
                <li><div>List item 3</div></li>
                <li><div>List item 4</div></li>
                <li><div>List item 5</div></li>
                <li><div>List item 6</div></li>
                <li><div>List item 7</div></li>
                <li><div>List item 8</div></li>
              </ul>
            </li>
            <li><div>Tulip</div>
              <ul>
                <li><div>List item 1</div></li>
                <li><div>List item 2</div></li>
                <li><div>List item 3</div></li>
                <li><div>List item 4</div></li>
                <li><div>List item 5</div></li>
                <li><div>List item 6</div></li>
                <li><div>List item 7</div></li>
                <li><div>List item 8</div></li>
              </ul>
            </li>
          </ul>
        </li>
        <li><div class="sticky">Trees</div></li>
      </ul>
    </li>
  </ul>


</div>



      </div>


    </div>
  )
}

export default ArchivementPopup
