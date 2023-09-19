import request from 'supertest'
import {app} from '../src/settings'
import { HTTP_STATUSES } from '../src/types'
import { blogsDb } from '../src/db/blogs-db'


describe('blogs',()=>{

    it('should return 204 and delete all videos',async () => {
        await request(app)
        .delete('/testing/all-data')
        .expect(HTTP_STATUSES.NO_CONTENT_204)
    })


    it('should return 200 and array of objects', async ()=>{
        await  request(app)
          .get('/blogs')
          .expect(HTTP_STATUSES.OK_200, blogsDb)
      })
})