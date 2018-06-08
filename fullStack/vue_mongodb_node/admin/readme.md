#### json-server

- 用于将一个json文件当做api来使用

**获取所有用户信息**
- http://localhost:3000/users

**获取id为1的用户信息**

- http://localhost:3000/users/1

**获取所有公司的信息**

- http://localhost:3000/companies

**获取单个公司的信息**

- http://localhost:3000/companies/1

**获取所有公司id为3的用户**

- http://localhost:3000/companies/3/users

**通过名字获取**

- http://localhost:3000/users?name=Herry

**根据多个名字货物用户信息**

- http://localhost:3000/users?name=Herry&name=Job

**获取一页中只有两条数据**

- http://localhost:3000/users?_page=1&_limit=2

**升序排序**

- http://localhost:3000/users?_page=1&_sort=asc

**获取年龄为20的**

- http://localhost:3000/users?age_gte=20

**搜索用户信息**

- http://localhost:3000/users?q=h