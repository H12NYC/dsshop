import saveDialog from '../save'
	import permissionDialog from '../permission'

	export default {
		name: 'role',
		components: {
			saveDialog,
			permissionDialog
		},
		data() {
			return {
				dialog: {
					save: false,
					permission: false
				},
				apiObj: this.$API.role.list,
				selection: [],
				params: {
					keyword: null
				},
				power: [],
				column: [
					{
						label: "ID",
						prop: "id",
						width: "100",
						sortable: true,
						hide: true,
					},
					{
						label: "角色名称",
						prop: "introduction",
						width: "300"
					},
					{
						label: "别名",
						prop: "roles",
						width: "300"
					},
					{
						label: "创建时间",
						prop: "created_at",
						width: "300",
						sortable: true
					},
					{
						label: "更新时间",
						prop: "updated_at",
						width: "300",
						sortable: true
					},
				]
			}
		},
		mounted() {
			this.getPower();
		},
		methods: {
			//获取权限列表
			async getPower(){
				const res = await this.$API.power.list.get();
				this.power = res.message
			},
			//添加
			add(){
				this.dialog.save = true
				this.$nextTick(() => {
					this.$refs.saveDialog.open()
				})
			},
			//编辑
			table_edit(row){
				this.dialog.save = true
				this.$nextTick(() => {
					this.$refs.saveDialog.open('edit').setData(row)
				})
			},
			//查看
			table_show(row){
				this.dialog.save = true
				this.$nextTick(() => {
					this.$refs.saveDialog.open('show').setData(row)
				})
			},
			//权限设置
			permission(){
				this.dialog.permission = true
				this.$nextTick(() => {
					this.$refs.permissionDialog.open(this.selection[0].id, this.selection[0].auth_rule.map(item => item.id)).setData(this.power)
				})
			},
			//删除
			async table_del(row){
				const loading = this.$loading();
				try{
					await this.$API.role.destroy.post(row.id);
					this.$refs.table.refresh()
					this.$message.success("删除成功")
				}finally{
					loading.close();
				}
				
			},
			//批量删除
			async batch_del(){
				this.$confirm(`确定删除选中的 ${this.selection.length} 项吗？如果删除项中含有子集将会被一并删除`, '提示', {
					type: 'warning'
				}).then(async() => {
					const loading = this.$loading();
					try{
						await this.$API.role.destroy.post(0,{
							ids: this.selection.map(item => item.id)
						});
						this.$refs.table.refresh()
						this.$message.success("操作成功")
					}finally{
						loading.close();
					}
				})
			},
			//表格选择后回调事件
			selectionChange(selection){
				this.selection = selection;
			},
			//搜索
			upsearch(){
				this.$refs.table.refresh()
			},
			//根据ID获取树结构
			filterTree(id){
				var target = null;
				function filter(tree){
					tree.forEach(item => {
						if(item.id == id){
							target = item
						}
						if(item.children){
							filter(item.children)
						}
					})
				}
				filter(this.$refs.table.tableData)
				return target
			},
			//本地更新数据
			handleSaveSuccess(data, mode){
				if(mode=='add'){
					this.$refs.table.refresh()
				}else if(mode=='edit'){
					this.$refs.table.refresh()
				}
			}
		}
	}