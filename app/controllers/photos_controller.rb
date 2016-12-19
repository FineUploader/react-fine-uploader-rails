class PhotosController < ApplicationController

  def index
    @photos = Photo.all
    @brand_name = 'PhotosApp'
  end

  def destroy
    photo = Photo.find_by(qquuid: params[:qquuid])
    if photo.destroy
       respond_to do |format|
          format.json {
             render json: { success: true }
          }
       end
     end
  end

  def upload
    photo = Photo.new
    photo.name = params[:qqfilename]
    photo.qquuid = params[:qquuid]
    photo.image = params[:qqfile]

    if photo.save
       respond_to do |format|
          format.json {
             render json: { success: true }
          }
       end
     else
       respond_to do |format|
         format.json {
           render json: { errors: 'Something went wrong'}
         }
       end
     end
  end

  def finish
    # Grab all parts of photo
    photos = Photo.where(qquuid: params[:qquuid]).all
    # Combine all parts
    @photo = Photo.combine_photos(photos)

    if @photo.save
       respond_to do |format|
          format.json {
             render json: { success: true }
          }
       end
     end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_photo
      @photo = Photo.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def photo_params
      params.require(:photo).permit(:name, :qquuid, :image)
    end
end
